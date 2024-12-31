---
description: |
  Leading provider of high-quality metal products, specializing in a wide range of materials and forms to meet diverse industrial and commercial needs.
address: "Kaoshiung City, Taiwan"
links:
  - "Resources, Products, /#how-to, true"   
  - "Social Media, Facebook, https://www.facebook.com/YiehCorp?sk=wall, true"
  - "Social Media, Instagram, https://www.instagram.com/yieh_corporation/, true"
  - "Social Media, WhatsApp, https://wa.me/886966159200?text=Hello%2C%20I%27m%20interested%20in%20learning%20more%20about%20your%20products, true"
  - "Social Media, Line, https://line.me/ti/p/Fh_n-t5VgK, true" 
---

# Footer Configuration Field Explanation

- **description**: A detailed description of the product or service that appears in the footer section. It explains the core features or benefits of the product, helping users understand what the service offers. In this case, it emphasizes the ease of building professional, secure websites with MDFriday.
- **address**: The physical location of the company or service, displayed in the footer. Here, it shows "Wuhan, China."
- **links**: A list of links to be displayed in the footer section. Each entry consists of a category, a link's title, URL, and a flag indicating whether the link is ready to be used (`true` means the link is ready, `false` means the link is not yet ready and might trigger an action like `onclick`). Links under the same category share the same category name but can have different URLs.
    - Example: `"Resources, Pricing, /pricing, false"` means there is a "Resources" category with a link titled "Pricing" that leads to `/pricing`, but it is not ready (likely will trigger an action instead of navigating).
    - Example: `"Resources, Documentation, /docs, true"` means there is a "Resources" category with a link titled "Documentation" that leads to `/docs`, and it is ready for use.
    - Example: `"Social Media, Facebook, https://www.facebook.com/YiehCorp?sk=wall, true"` 
    - Example: `"Social Media, Instagram, https://www.instagram.com/yieh_corporation/, true"` 
    - Example: `"Social Media, WhatsApp, https://wa.me/886966159200?text=Hello%2C%20I%27m%20interested%20in%20learning%20more%20about%20your%20products, true"`

#### Notes:
- Links within the same category (e.g., multiple "Resources" links) are listed consecutively under the same category name.
- The category name (e.g., "Resources") appears in the first position, followed by the link title, URL, and readiness flag.
