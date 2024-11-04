# React SoftBenz Store

This is a simple e-commerce store built with React and Vite as mentioned in the assignment.
Following are the requirements that are fulfilled in this project:

- The store should have a home page that displays a list of products.
- The store should have a product detail page that displays the details of a product.
- The store should have a cart page that displays the items in the cart.
- Should be able to update cart items

## Caveats

Some of the caveats that I found while implementing the API provided in the list are:

- I could not add the product which had variantType other than "None" in the cart. This is because I could not figure out the payload to send to the API.
- I tried to show all the variants in the product detail page, which showed different prices and the stock quantities, but the behavior of the stock quantities might not work correctly. 
- I could not add the product items which were in stock.

## Packages Used

- `react-router-dom` for routing
- `axios` for API requests
- `react-hot-toast` for showing toasts
- `lucide-react` for icons
- `react-query` for data fetching
- `tailwindcss` for styling
- `shadcn ui` for some ui components

## Design

The design is fully responsive. I also designed the website in Figma. You can check the design [here](https://www.figma.com/design/NcPPvgCQ1votv4GAiXCjWa/Softbenz-Ecommerce?node-id=0-1&node-type=canvas&t=x1I91ZkgSNTO932s-0).
