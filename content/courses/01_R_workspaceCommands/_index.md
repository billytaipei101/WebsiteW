---
date: "2021-01-11T00:00:00Z"
draft: false
lastmod: "2021-01-11T00:00:00Z"
linktitle: Workspace Commands for R
menu:
  example:
    name: Workspace Commands
    weight: 1
summary: Learn about the most frequently used workspace commands for R.
title: Workspace Commands
toc: true
type: docs
weight: 1
---

In order to start working with R you need to prepare your working space or environment, this involves downloading, installing and loading the packages that will be required by the processes you want to perform; sometimes it also involves specifying what will be the encoding of your script, whether to turn off the scientific notation when getting an output among others such as set the [CRAN repository](https://cran.r-project.org/mirrors.html) from which you would desire to download the packages, etc.

* **Setting packages repository**
* **Download, Install and Load packages**
* **Change, Set working directory**
* **Script encoding, scientific notation among other miscelaneous features**

## Setting packages repository

The list of exhaustive CRAN repositories can be found in the following website <https://cran.r-project.org/mirrors.html>, choose a location close to you.

```{r, echo = FALSE}
r <- getOption("repos")
r["CRAN"] <- "https://www.icesi.edu.co/CRAN/"    # Repository used in Colombia
r["CRAN"] <- "http://cran.csie.ntu.edu.tw/"      # Repository used in Taiwan
options(repos=r)
```

##  Download, Install and Load packages

The most simple way is to identify the name of the package and enter the following lines in the console for downloading, installing and loading a package into the current working environment. You only need to perform this once for installing a package, but if you restart a session you ought to load the required package everytime with the `library()` command.

```{r, echo = FALSE}
.libPaths()                     # Generates the current path were packages are saved, change if neccesary
install.packages('openxlsx')    # install the package to your local disk
library('openxlsx')             # load the pacakge into your current 
```
Other functions related with package management include the following

```{r, echo = FALSE}
remove.packages('agricolae')                     # Remove package from your local disk
installed.packages()                             # Generates a list of the currently installed packages
update.packages()                                # updates the currently installed packages 

k<-as.data.frame(installed.packages(),stringsAsFactors = FALSE)  # consult installed packages as a data frame
```

For large scripts or function in which you might require a large number of packages different approaches are plausible, as the following

```{r, echo = FALSE}
.libPaths("/Users/williamcruz/Documents/R Packages") # change the path accordingly to your packages folder
r <- getOption("repos")
r["CRAN"] <- "http://cran.csie.ntu.edu.tw/"          # set repository to a National Repository in your country
options(repos=r)
x <- c('ggplot2','openxlsx','plyr')                  # a list of packages to be used
packages <- as.data.frame(installed.packages())      # List of currently installed packages

for (i in 1:length(x)) {
  if(x[i] %in% packages$Package == TRUE){
    library(x[i],character.only = TRUE)  
  }else if(x[i] %in% packages$Package == FALSE){
    install.packages(as.character(x[i]))
    library(x[i],character.only = TRUE)  
  }
}
```

The next option involves to have downloaded the `pacman` package, but is also a good and compact option when you need to load several packages at the beggining of a session.

```{r, echo = FALSE}
library(pacman)
pacman::p_load(simstudy,minerva,pcaPP,parallel,dplyr,ggplot2,grid,
               scales,plyr,ggthemes,ggrepel,ggpubr,simFrame,corTest)
```
## Change, set working directory

Some of the procedures you perform in *R*

```{r, echo = FALSE}
getwd()                                # print the current working directory - cwd
setwd('a valid directory path')        # set the working directory to the specified path

dir()                                  # Produce a vector of the file names in the current wd
dir("name of directory")               # allows to choose one file within the cwd
```

## Miscelaneous Features

Some other workspace frequently used commands include the following
```{r, echo = FALSE}
options(scipen = 99)               # turn off scientific notation (optional)
options(encoding = "UTF-8")        # Select the encoding of the files, not absolutely required
rm(list=ls())                      # Erasing all objects from the current work environment
cat("\014")                        # Erasing previous commands from the console

ls()                               # list the objects in the current workspace
ls(pat = "m")                      # list the objects that have in their name a given pattern
ls(pat = "^m")                     # Lists objects whose name start with m
ls.str(pat= "M", max.level=-1)     # Reduces the level of information
ls.str()                           # Display some details of the objects in memory
rm(list=ls())                      # Erasing all objects from the current work environment

m <- as.data.frame(list.files(),stringsAsFactors = FALSE) # make a data frame out of the files names in the current wd
m$index <- as.numeric(m$'list.files()' == 'x')            # Procedure to check whether a file exist or not in the current wd

help(options)                                    # learn about available options
help('bs') | help('bs', package = 'splines')     # Search info about the funcion bs
apropos('lm')                                    # Finds all functions which name contains the character string given as measure
options()                                        # view current option settings
options(digits=3)                                # number of digits to print on output

history()                                        # display last 25 commands
history(max,show=Inf)                            # display all previous commands

savehistory(file="myfile")                       # default is ".Rhistory"
loadhistory(file= "myfile")                      # default is ".Rhistory"

save.image()                                     # save the workspace to the file .RData in the cwd
save(x, file="myfile,RData")                     # save specific objects to a file
n <- list(MP=MP,MP.original=MP.original)         
save(n, file= "myfile.RData")                    # save specific objects to a file
load("myfile.RData")                             # load a workspace into the current session
q()                                              # quit R. You will be prompted to save the workspace

rm(x)                                            # Deletes the object x
rm(x,y)                                          # Deletes both objects x and y
rm(list=ls())                                    # Deletes all objects in memory
rm(list=ls(pat= "^m"))                           # Deletes selectively some objects

?lm                                              # How the linear model function works
help(lm)                                         # Same as above
help("lm")                                       # Same as above
help(lm, try.all.packages=TRUE)                  # allows to search in all packages
help("bs", package = "splines")                  # Display help pages from a package not loaded in memory
help.start()                                     # A search with keywords is possible with this html help
help.start("tree", rebuild=TRUE)                 # refresh the database used
apropos("help")                                  # finds all functions which name contains the given character string
```

