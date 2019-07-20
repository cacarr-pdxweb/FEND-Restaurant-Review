//// I was considerably helped by the service worker primers at developers.google.com

//// files to be cached
const urlsToCache = [
    '/',
    'index.html',
    'restaurant.html',
    // 'restaurant.html?id=1',
    // 'restaurant.html?id=2',
    // 'restaurant.html?id=3',
    // 'restaurant.html?id=4',
    // 'restaurant.html?id=5',
    // 'restaurant.html?id=6',
    // 'restaurant.html?id=7',
    // 'restaurant.html?id=8',
    // 'restaurant.html?id=9',
    // 'restaurant.html?id=10',
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

const projectCache = "project-cache-v1";

//// Install 
self.addEventListener('install', (e) => {
    console.log('[ServiceWorker] Attempting SW installation and assets caching');

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

//// Fetch
self.addEventListener('fetch', (e) => {

    e.respondWith(

        caches.match(e.request)

            .then((response) => {

                return response || fetch(e.request);
            })
    );
});

//// Activate
self.addEventListener('activate', (e) => {
    
    e.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.filter((cacheName) => {
                        return cacheName.startsWith('project-') &&
                            cacheName != projectCache;
                    }).map((cacheName) => {
                        return caches.delete(cacheName);
                    })
                );
            })
    );
});




