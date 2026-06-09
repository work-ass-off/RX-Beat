# Sprint 2:  Routing & Signals (@angular/router, @angular/core) — 2025-05-19

- **What was done:** I read about Angular router, how to define routes, router loading strategies, show routes with outlets, navigate to routes, redirecting routes topics. Also I had meet in Google meet with my team where we discus about how signals behave in zone.js and zoneless. In addition I created using Angulr CLI all page, music page, podcasts page, login page, about page.components. Also configured basics routes for home page, all page, music page, podcasts page, login page, about page.
- **Problems:** During routing configuration I met problem with redirect to first child route by default inside home. 
- **Solutions:** To solve that issue I read Angular documentation about redirecting routes, and used inside child routes array construction:

```

{

    path: '',
    redirectTo: 'all',
    pathMatch: 'full'

},

```

- **What I learned:** I repeated how to define routes, which loading strategies exist, how to show routes with using router outlets, how to navigate to routes, and how configure redirect to athother path.
- **Plans:** I have plan to continueto configure basics routes.
- **Time spent:** 8 hours.