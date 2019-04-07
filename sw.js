const projectCache = "project-cache-v1";

// files to be cached
const urlsToCache = [
    '/',
    'index.html',
    'restaurant.html',
    'restaurant.html',
    'restaurant.html?id=1',
    'restaurant.html?id=2',
    'restaurant.html?id=3',
    'restaurant.html?id=4',
    'restaurant.html?id=5',
    'restaurant.html?id=6',
    'restaurant.html?id=7',
    'restaurant.html?id=8',
    'restaurant.html?id=9',
    'restaurant.html?id=10',
    'css/styles.css',
    'js/main.js',
    'js/dbhelper.js',
    'js/restaurant_info.js',
    'data/restaurants.json',
    'img/1.jpg',
    'img/2.jpg',
    'img/3.jpg',
    'img/4.jpg',
    'img/5.jpg',
    'img/6.jpg',
    'img/7.jpg',
    'img/8.jpg',
    'img/9.jpg',
    'img/10.jpg'
];

/* Install service worker */
self.addEventListener('install', (e) => {
    console.log('ServiceWorker: Attempting Installation');

    /* delays install event until promise is resolved */
    e.waitUntil(

        caches.open(projectCache)
            .then((cache) => {

                console.log('ServiceWorker: Caching Assets');
                return cache.addAll(urlsToCache);
            })
    );
});



// /* Activate Service Worker */
self.addEventListener('activate', (e) => {
    console.log('ServiceWorker: Activated');

    /* makes activation event wait until cache name check/delete completes */
    e.waitUntil(
        
        caches.keys().then((allCacheNames) => {
            return Promise.all(allCacheNames.map((thisCacheName) => {
                
                /* if cached file is saved under previous projectCache version */
                if (thisCacheName !== projectCache) {

                    console.log('ServiceWorker: Removing Cached Files from', thisCacheName);
                    
                    /* delete file from old cache */
                    return caches.delete(thisCacheName);
                }
            }));
        }) 
    );
});



/* Fetch */
self.addEventListener('fetch', (e) => {
    console.log('ServiceWorker: Fetching', e.request.url);

    e.respondWith(

        caches.match(e.request).then((response) => {
            if (response) {
                console.log('ServiceWorker: Fetch Responded');
                return response;
            }
            console.log('Fetching');
            return(e.request);
        })
        .catch((err) => console.log(err)) 
    );
}); 