---
date: "2021-01-12T00:00:00Z"
external_link: ""
image:
  caption: 攝影：Meng Ting
  focal_point: Smart
summary: 行人導航策略的集群分析
tags:
- Cluster analysis
title: 導航資料的集群分析
url_code: ""
url_pdf: ""
url_slides: ""
url_video: ""

---

```{r setup, include=FALSE}
knitr::opts_chunk$set(echo = TRUE)
```
## 集群分析

環境準備與圖形樣式設定

```{r, echo = TRUE}
library(pacman) #' Environment preparation
pacman::p_load(plyr,psych,openxlsx,fpc,pvclust,cluster,mclust,
               factoextra,flexclust,reshape,knitr,dendextend,plotly,
               dplyr,magrittr,ggpubr,corrplot,ggthemes,scales) # added for MDS and intervariable correlation
setwd('/Users/williamcruz/Desktop/4_COMPU_SCI/B_WebsiteW/WebsiteW/content/project/Hyerarchical-Analysis/dta')
dt <- read.xlsx('dt.xlsx',sheet = 3, rowNames = TRUE)
```
在開始集群分析之前，最好只保留資料集中資訊量最高的變項。視覺化相關矩陣的常見做法是熱圖，可以看出哪些變項彼此之間相關很低或沒有相關。
從下方的熱圖與相關係數表可以看出，至少有兩個變項 `targe` 與 `route` 的相關係數偏低（介於 -0.35 與 0.35 之間），因此後續分析將排除這兩個變項。
```{r, echo = TRUE}
res.cor <- cor(dt, method = 'spearman')       # correlation matrix
mds.cor <- (1- res.cor) %>%                   # using MDS to reveal hidden patterns in correlation matrix
  cmdscale() %>%
  as_tibble()
colnames(mds.cor) <- c('Dim.1','Dim.2')
plot_cor01 <- ggscatter(mds.cor, x = 'Dim.1', y = 'Dim.2',
                        label = colnames(res.cor),
                        size = 1,
                        repel = T)+
  theme_classic() +
  ggtitle('MDS for correlation coefficient between variables')
plot_cor01
plot_cor02 <- corrplot::corrplot(res.cor)
t00 <- kable(res.cor, format = "html", digits = 2)
t00
```
MDS 相關             |  相關熱圖
:-------------------------:|:-------------------------:
![](img/plot_cor01.png)  |  ![](img/plot_cor02.png)

接著進行幾個前置步驟，包括移除遺漏值與將資料標準化，如下所示
```{r}
mydata <- subset(dt,select=c(1:5,8:9))
mydata <- na.omit(mydata)                               # listwise deletion of missing data
mydata <- scale(mydata, center = TRUE, scale = TRUE)    # scale the data 
```

### 階層式集群方法

下一步是評估不同的階層式集群（hierarchical clustering, HC）方法，找出哪一種能提供較強的集群結構。以下探討幾種**聚合式集群演算法**：這類演算法一開始將每個物件視為單一元素的集群，之後每一步把最相似的兩個元素合併成一個集群。**聚合係數**越接近 1，集群結構越強；計算時使用 `cluster` 套件的 `agnes` 函數。
```
m <- c("average","single","complete","ward"); names(m) <- c("average","single","complete","ward")
ac <- function(x){ # function to compute the coefficient
  agnes(mydata, method = x)$ac
}
purrr::map_dbl(m,ac)  # agglomerative coefficient through the agnes() function
```
| average   | single    | complete  | ward      |
|-----------|-----------|-----------|-----------|
| 0.7978476 | 0.7146516 | 0.8520016 | 0.9232789 |

接著，以不同的方法找出適合擷取的集群數目。下圖比較手肘法、輪廓法與間隙統計量三種方法的結果。從圖中看不出明確的最佳集群數；不過輪廓法建議 5 個集群，也是最精簡的解。

```{r}
p1 <- fviz_nbclust(mydata, FUN = hcut, method = "wss", k.max = 10)+        # WSS method
  ggtitle("(A) Elbow method")+theme_classic()
p2 <- fviz_nbclust(mydata, FUN = hcut, method = "silhouette", k.max = 10)+ # Silhouette method
  ggtitle("(B) Silhouette method")+theme_classic()
p3 <- fviz_nbclust(mydata, FUN = hcut, method = "gap_stat", k.max = 10)+   # Gap method
  ggtitle("(C) Gap statistic")+theme_classic()
gridExtra::grid.arrange(p1,p2,p3, nrow=1)
```
![](img/number_cluster.png)
接著，針對**聚合係數**較大的兩種方法，以 `hlcust()` 函數進行聚合式階層集群；但要先用 `dist()` 函數以*歐氏*距離計算*相異度*，也就是依畢氏定理得到的距離矩陣。
```{r}
d   <- dist(mydata, method = "euclidean") # distance matrix using Euclidean method (dissimilarity matrix?)
hc1 <- hclust(d, method = "ward.D2")      # HC using the Ward's method
hc2 <- hclust(d, method = "complete")     # HC using the Complete method
sub_grp0 <- cutree(hc1,k=5)               # using 5 as the number of clusters to extract
sub_grp1 <- cutree(hc2,k=5)
table(sub_grp0) # number of members in each cluster in Ward solution
table(sub_grp1) # number of members in each cluster in Complete solution
```
繪製**樹狀圖**，並標示先前得到的 5 個集群
```{r, echo = FALSE}
p4 <- fviz_dend(hc1,k=5, horiz = FALSE, rect = TRUE, rect_fill = TRUE, rect_border = "jco",
                k_colors = "jco")+
  ggtitle("Dendogram using Ward's solution")+theme_classic()
p5 <- fviz_dend(hc2,k=5, horiz = FALSE, rect = TRUE, rect_fill = TRUE, rect_border = "jco",
                k_colors = "jco")+
  ggtitle("Dendogram using Complete solution")+theme_classic()
gridExtra::grid.arrange(p4,p5, nrow=1)
```
![樹狀圖](img/dendogram.png)

此外，`pvclust()` 函數能以多尺度拔靴重抽樣為階層式集群提供 *p* 值。資料越支持的集群，*p* 值越大。每個集群都會計算 *p* 值。下圖使用 `pvrect` 函數，框出在指定 *alpha* 值下達顯著的集群。
```{r}
mydata2 <- data.frame(t(mydata))
fit <- pvclust(mydata2, method.hclust = "ward.D", method.dist = "euclidean")
plot(fit) + pvrect(fit, alpha=0.99)
fit <- pvclust(mydata2, method.hclust = "complete", method.dist = "euclidean")
plot(fit) + pvrect(fit, alpha=0.90)
```
Ward 法的解            |  完全連結法的解
:-------------------------:|:-------------------------:
![](img/dendo_p01.png)  |  ![](img/dendo_p02.png)

從上方左圖可以看出，使用 Ward 法時，兩個較大的集群在 alpha 為 0.99 時達顯著；完全連結法則產生數量較多、規模較小的集群。

#### 圍繞中心點分割法（PAM）

圍繞中心點分割法（Partitioning Around Medoids, PAM）是一種用於集群分析的非監督式機器學習演算法：它在資料集中尋找 *k* 個代表性物件（*k* 個中心點，medoids），再將每個物件指派給最接近的中心點，藉此形成集群。它可以視為 Ward 法集群解的替代方案，而且一般認為比 *k* 平均法更穩健，因為它以中心點而非平均數或質心作為集群中心，對雜訊與離群值較不敏感。中心點是各集群內的實際物件／觀察值，其與集群中所有其他成員之間的平均相異度最小。透過這個方法，我們可以得到 *k* 個代表性物件，使各觀察值與其最接近的代表性物件之間的相異度總和最小。
```{r}
# Ward's Solution
p6 <- fviz_cluster(list(data=mydata, cluster = sub_grp0))+
  ggtitle("Cluster Solution - Ward's method")+theme_classic()
# PAM's Solution
pam.res0 <- pam(mydata, 5, metric = "euclidean", stand = FALSE) # using the pam function
print(pam.res0)
p7 <- fviz_cluster(list(data=mydata, cluster = pam.res0$clustering))+
  ggtitle("Cluster Solution - PAM method")+theme_classic()
gridExtra::grid.arrange(p6,p7, nrow=1)

Medoids:
   ID  no_rotate rotate_body rotate_map head_light  landmark navigation       zoom
30 29  1.2793762  -1.3378949 -0.8974162 -1.5893542  1.670897 -0.6076631  1.2861607
31 30 -0.6711482   0.7709903  0.6922925  0.2132061 -0.648408 -0.6076631 -0.7761314
25 24 -0.6711482   0.7709903 -0.8974162  0.2132061 -0.648408  1.6528435  1.2861607
8   8 -0.6711482  -1.3378949  1.4871469 -1.5893542  1.670897  0.1458391  1.2861607
27 26  1.9295510  -1.3378949 -0.8974162  0.8140595 -0.648408 -0.6076631 -0.7761314
```
![](img/pam_ward.png)
上方印出的結果顯示各集群的中心點，以及標明每個點所屬集群的集群向量。

#### 評估分割品質

以下程式碼示範如何以所提模型與集群數目的解釋變異百分比，評估分割的品質。
```{r}
# Ward's Solution
model <- kmeans(mydata, centers = 5) 
BSS <- model$betweenss # Between Sum of Squares 
TSS <- model$totss     # Total Sum of Square
BSS/TSS*100            # Explained percentage

[1] 71.6807

# PAM's Solution
model_PAM <- kmeans(mydata, centers = pam.res0$medoids)
BSS <- model_PAM$betweenss # Between Sum of Squares 
TSS <- model_PAM$totss     # Total Sum of Square
BSS/TSS*100                # Explained percentage

[1] 73.20949
```
#### 將分類結果加入原始資料

下一步是把分類資訊加入原始資料
```{r}
mydata0 <- data.frame(mydata)                           # data frame without appending the groups
mydata3 <- data.frame(cbind(mydata,cluster = sub_grp0)) # append cluster information from Ward's Solution to original data
mydata4 <- data.frame(cbind(mydata,cluster = pam.res0$clustering)) # append cluster information from PAM's Solution
df01 <- melt(mydata3, id.var = "cluster")
df02 <- melt(mydata4, id.var = "cluster")
df01$cluster <- as.character(df01$cluster)
df02$cluster <- as.character(df02$cluster)
```
參見輪廓圖 ~（未完待續…）

#### 描述性分析

以下的視覺化分析只針對 PAM 演算法的分類結果，因為它略優於 Ward 法的解

```{r}
set_var01 <- c('head_light','rotate_body','rotate_map')
set_var02 <- c('no_rotate','landmark','navigation','zoom')
mini_set01 <- subset(df02,df02$variable %in% set_var01)
mini_set02 <- subset(df02,df02$variable %in% set_var02)
p00 <- ggplot(data = mini_set01, aes(x=variable, y=value)) +
  geom_boxplot(aes(fill = cluster),outlier.size = 1) +
  facet_wrap( ~ cluster, scales="free", ncol = 2) +
  xlab(label = NULL) + ylab(label = NULL) + ggtitle("Boxplots for 5 Navigation Groups") +
  guides(fill=guide_legend(title="Groups"))+theme_cleveland()
p00A <- ggplot(data = mini_set02, aes(x=variable, y=value)) +
  geom_boxplot(aes(fill = cluster),outlier.size = 1) +
  facet_wrap( ~ cluster, scales="free", ncol = 2) +
  xlab(label = NULL) + ylab(label = NULL) + ggtitle("Boxplots for 5 Navigation Groups") +
  guides(fill=guide_legend(title="Groups"))+theme_cleveland()
```
第一組變項       |  第二組變項
:-------------------------:|:-------------------------:
![](img/main_var01.png)  |  ![](img/main_var02.png)

根據這些結果，可以進一步探討在最大的幾個群組之間，哪些變項有顯著差異甚至方向相反（見樹狀圖）。為此，將**第 5 組**（*藍色*）與*第 2 組*（*黃色*）重新標記為 *A*，構成左側的集群；將**第 1 組**（*淺藍色*）、**第 3 組**（*灰色*）與**第 4 組**（*紅色*）重新標記為 *B*，構成右側的集群。
```{r}
gr1 <- c(2,5); gr2 <- c(1,3,4)
mydata4$new_cluster <- c(NA)
for (i in 1:nrow(mydata4)) {
  if(mydata4$cluster[i] %in% gr1){
    mydata4$new_cluster[i] <- c('A')
  }else if(mydata4$cluster[i] %in% gr2){
    mydata4$new_cluster[i] <- c('B')
  }
}
df03 <- melt(mydata4, id.var = "new_cluster")
df03$new_cluster <- as.character(df03$new_cluster)
```
完成之後，這兩個最大群組的長條圖如下
```{r}
mini_set03 <- subset(df03,df03$variable %in% set_var01)
mini_set04 <- subset(df03,df03$variable %in% set_var02)
p000 <- ggplot(data = mini_set03, aes(x=variable, y=value)) +
  geom_boxplot(aes(fill = new_cluster),outlier.size = 1) +
  facet_wrap( ~ new_cluster, scales="free", ncol = 2) +
  xlab(label = NULL) + ylab(label = NULL) + ggtitle("Boxplots for 2 Largest Groups") +
  scale_y_continuous(breaks = seq(-2.5,2.5,0.5))+
  guides(fill=guide_legend(title="Groups"))+theme_cleveland()
```
![](img/ab_01.png)

```{r}
Table: Comparison between the two largest groups that resulted of the agglomerative HC model with the PAM algorithm for 3 variables: head_light, rotate_body and rotate_map
```
| 變項                 | A | 關係     | B |   p   |
|----------------------|:-:|:--------:|:-:|:-----:|
| rotate_body (轉身體) | + |     >    | - | 0.000 |
| rotate_map (轉地圖)  | + |     >    | - | 0.002 |
| head_light (頭燈)    | + |     >    | - | 0.005 |

```{r}
p000A <- ggplot(data = mini_set04, aes(x=variable, y=value)) +
  geom_boxplot(aes(fill = new_cluster),outlier.size = 1) +
  facet_wrap( ~ new_cluster, scales="free", ncol = 2) +
  xlab(label = NULL) + ylab(label = NULL) + ggtitle("Boxplots for 2 Largest Groups") +
  scale_y_continuous(breaks = seq(-2.5,2.5,0.5))+
  guides(fill=guide_legend(title="Groups"))+theme_cleveland()
```
![](img/ab_02.png)
```{r}
Table: Comparison between the two largest groups of the HC model for no_rotate, landmark, navigation and zoom
```

#### 為兩大群組命名

在描述這兩大群組時，首先看 *rotate_body*、*rotate_map* 與 *head_light* 這三個變項；A 組在這些變項上的分數一致較高。也就是說，被歸為 A 組的受試者會主動依據 GoogleMaps 提供的線索評估自己在空間中的位置：轉動身體以辨認代表自己正前方的藍色光束方向，並旋轉地圖以對應環境中已知的地形特徵。相對地，B 組的受試者一般不會以轉動身體作為判斷方向的策略，查看藍色光束方向的次數也顯著較少。根據這些觀察，我們可以初步推論：A 組的導航策略高度依賴內在、局部、以自身為參照的線索，B 組的策略則依賴外在、整體，以及環境中物體之間的關係。

其次看 *no_rotate*、*landmark*、*navigation* 與 *zoom* 這幾個變項；B 組在這些變項上的分數一致較高。這一組不做旋轉，因此在該行為上得分較高；此外，他們會主動使用應用程式中顯示的地標，放大畫面的頻率也相對高於 A 組。這印證了我們對兩組主要特徵的初步想法：A 組較依賴局部且以自我為中心的線索，B 組則較依賴整體且以環境為中心的線索。

![MTL 論文中導航策略的視覺化呈現](img/strategies.png)

根據以上討論，在 MTL 論文的上述視覺化呈現中，最能代表這兩組的策略為：我們結果中的 **A** 組對應圖中策略 (B) 與 (F) 的組合，**B** 組則對應策略 (A) 與 (C) 的組合。
