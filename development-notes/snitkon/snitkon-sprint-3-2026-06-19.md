# Sprint 3: Directives, Pipes & Forms — 2025-06-19

- **What was done:** Developed core media pages (albums-page, artists-page, and tracks-page) integrated with the Jamendo API endpoints. Designed a unified data-fetching strategy in JamendoService using Angular's HttpClient with support for dynamic HttpParams and HttpContext. Introduced custom metadata passing via HttpContextToken (LOADER_TYPE) to target specific feature loaders directly from HTTP requests. Built a centralized, signal-based LoadingService to track parallel request states and created a reusable LoaderSpinnerComponent with input-driven sizing. Extracted nested route data on the tracks page via ActivatedRoute.paramMap combined with RxJS declarative mapping (switchMap, map) for contextual data loading. Additionally, integrated the NgOptimizedImage directive (ngSrc) into the AlbumComponent card to enforce layout stability (width/height attributes) and optimize image loading.
- **Problems:**
    * Needed a scalable way to handle asynchronous loading spinners globally without cluttering individual page components with manual boolean flags.
    * Required a mechanism to pass metadata from specific services down to an HTTP interceptor or core client logic so the application knows exactly which loader (albums, artists, tracks) should be activated.
    * Managing dynamic routing for tracks where the data source depends on whether a user navigated from an album context, an artist context, or the global tracks list.
    * Ensuring proper image optimization and avoiding Cumulative Layout Shift (CLS) when loading external image assets from third-party music APIs.
- **Solutions:**
    * Created an active loader registry in LoadingService powered by a reactive signal<Record<string, number>> with computed checks (isLoaderActive), capable of counting ongoing matching requests.
    * Initialized an HttpContextToken<string> called LOADER_TYPE and modified the base getWithHttpClient method to instantiate a new HttpContext().set(LOADER_TYPE, contextData) for each explicit request context.
    * Connected ActivatedRoute params into an RxJS pipe that inspects the presence of albumId or artistId, conditionally dispatching the correct targeted API call via switchMap and falling back to a default tracks stream.
    * Replaced standard <img> tags with Angular's NgOptimizedImage (ngSrc), passing explicit width/height dimensions to guarantee predictable bounding boxes prior to image download.
- **What I learned:**
    * Advanced my understanding of Angular HttpClient capabilities, specifically leveraging HttpContext and tokens to stream meta-configurations downstream.
    * Mastered Signal-based state design for complex cross-component patterns, such as tracking loading interactions based on feature key strings.
    * Gained hands-on experience utilizing complex RxJS streams to handle conditional relational routing using route params.
    * Learned modern web-vital optimization techniques by deploying NgOptimizedImage and understanding how mandatory layout constraints prevent structural shifting during media streaming.
- **Plans:** Deepen integration with advanced HTTP features, such as building robust interceptors for automated authentication token attachment, centralized global error interceptors, and exploring caching layers for frequently accessed music data streams.
- **Time spent:** 9 hours.