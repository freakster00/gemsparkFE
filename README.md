# Vendure NextJS Storefront
This is NextJS starter for Vendure. This is still in Development, but feel free to read the concepts and run the store.

## What is Vendure.io
Vendure is

a headless e-commerce platform. By "headless" we mean that it exposes all of its functionality via APIs. Specifically, Vendure features two GraphQL APIs: one for storefronts (Shop API) and the other for administrative functions (Admin API).

These are the major parts of a Vendure application:

    Server: The Vendure server is the part that handles requests coming in to the GraphQL APIs. It serves both the Shop API and Admin API, and can send jobs to the Job Queue to be processed by the Worker.
    Worker: The Worker runs in the background and deals with tasks such as updating the search index, sending emails, and other tasks which may be long-running, resource-intensive or require retries.
    Admin UI: The Admin UI is how shop administrators manage orders, customers, products, settings and so on. It is not actually part of the Vendure core, but is provided as a plugin (the AdminUiPlugin) which is installed for you in a standard Vendure installation. The Admin UI can be further extended to support custom functionality, as detailed in the Extending the Admin UI section
    Storefront: With headless commerce, you are free to implement your storefront exactly as you see fit, unconstrained by the back-end, using any technologies that you like. To make this process easier, we have created a number of storefront starter kits, as well as guides on building a storefront.

## Installation

1. Clone this repo
2. ```npm i```
3. ```npm run dev```

Just remember you need to have the Vendure store running locally to use this storefront.

## Table of contents
- [Vendure NextJS Storefront](#vendure-nextjs-storefront)
  - [Installation](#installation)
  - [Table of contents](#table-of-contents)
    - [Vendure Server](#vendure-server)
  - [Zeus](#zeus)
  - [Page naming convention](#page-naming-convention)
  - [Internationalization with i18next](#internationalization-with-i18next)
  - [Icons](#icons)
  - [Styles](#styles)
  - [Theme](#theme)
  - [Useful Links](#useful-links)
  - [Who?](#who)
  - [Roadmap](#roadmap)


### Vendure Server

This storefront requires a Vendure V2 server. You can either run a local instance, or use our public demo server.

For the best experience of our demo, you need to apply some modifications into Vendure, but these are just ‘small’ ones.

Our demo of Vendure server (MinIO & Postgres & SMTP) can be found [here](https://github.com/aexol-studio/aexol-shop-backend) to see all changes.


## Zeus

We use zeus to provide Selectors for certain GraphQL query parts. You can think about Selectors like fragments in GraphQL, but type-safe

## Page naming convention

In this starter, we follow a naming convention for pages that aligns with DDD (Domain-driven design) principles. Each page file is named using the format `page-name.page.tsx`, where `page-name` represents the name of the page or route. For example, the main page of your application could be named `index.page.tsx`.
Using this naming convention helps maintain a clean and organized folder structure that reflects the structure of your application's domains or features. By separating pages into their respective folders and adopting a consistent naming convention, you can easily locate and manage your application's routes.


## Icons

Lucide icons

## Useful Links

- [Zeus Documentation](https://graphqleditor.com/docs/tools/zeus/basics/getting-started/)
- [i18next Documentation](https://www.i18next.com/)
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://reactjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)


## Roadmap

- [ ] Finish this starter
- [X] Deployment of the storefront connected to demo shop
- [X] Basic Cart functionality
- [X] Basic Checkout process
- [ ] Design implementation
- [X] Basic Payment process
- [X] Basic User Profile
- [X] Search products
- [X] Filters
- [ ] Configure SEO and schema.org for every site
