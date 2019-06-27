//// I was considerably helped by the service worker primers at developers.google.com

//// files to be cached
const urlsToCache = [
    '/',
    'index.html',
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

//// Application shell is cached and pages display offline 

const projectCache = "project-cache-v1";

//// Install 
self.addEventListener('install', (e) => {
    // console.log('[ServiceWorker] Attempting SW installation and assets caching');

    // Delays install event until Promise is resolved - all files added to cache 
    e.waitUntil(

        // Opens the cache 
        caches.open(projectCache)
            .then((cache) => {

                // Add files to cache - cache application shell 
                console.log('[ServiceWorker] Adding files in urlsToCache array to cache');
                return cache.addAll(urlsToCache);

                // Promise resolved
            })
    );
});


/** === TODO: add activate event to handle outdated caches === **/

// Fetch 
self.addEventListener('fetch', (e) => {

    console.log('[ServiceWorker] Fetch event for ', e.request);

    // Fetch event response
    e.respondWith(

        // Check cache for request
        caches.match(e.request)

            .then((response) => {

                // If request in cache
                if (response) {

                    // console.log('[ServiceWorker] Found', e.request.url, ' in cache');

                    // Return cached version
                    return response;
                }
                console.log('[ServiceWorker] Network request for ', e.request.url);
                return fetch(e.request)


                    // If request not in cache, fetch and cache
                    .then((response) => {

                        // Open cache 
                        return caches.open(projectCache)

                            .then((cache) => {

                                // Put fetched response in cache
                                cache.put(e.request.url, respononse.clone());

                                // Return response
                                return response;
                            });
                    });



            }).catch((error) => {

                // TODO: Consider adding offline page

            })
    );
}); 


