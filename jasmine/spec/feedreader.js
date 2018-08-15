/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        it('each feed has a url property defined', function() {
            for(let feed of allFeeds) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            }
        });

        it('each feed has a name property defined', function() {
            for(let feed of allFeeds) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            }
        });
    });

    describe('The menu', function() {
        // refactor: body element is context for each spec in this suite
        const body = document.querySelector('body');

        it('is hidden by default', function() {
            // target body and test for presence of class
            expect(body.classList.contains('menu-hidden')).toBe(true);
        });

         it('toggles on and off when menu icon is clicked', function() {
             // click event is registered on the 'menuIcon'
             // get this object and store in variable
             const menuIcon = document.querySelector('.menu-icon-link');
             
             // simulate first click, toggling menu ON
             menuIcon.click();
             // run first test, expect menu to be *visible* (not hidden)
             expect(body.classList.contains('menu-hidden')).toBe(false);

             // simulate second click, toggling menu OFF
             menuIcon.click();
             // run second test, expect menu to be hidden again
             expect(body.classList.contains('menu-hidden')).toBe(true);

            /** ######## Begin Attribution ########
            *  Referenced means for simulating click event on page element from
            *  https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/click
            *  on August 11, 2018  
            *  ######## End Attribution ########
            */
         });
    });
    
    describe('Initial Entries', function() {
        // to run tests asynchronously relative to loadFeed event, must use
        // done to check for finished status
        beforeEach(function(done) {
            // load the first feed container
            // loadFeed accepts second cb parameter which we'll use to trigger finished status
            loadFeed(0, done);
        });

        it('feed container is loaded and contains at least one entry', function() {
            // once feed has loaded, target specifically instances of .entry-link
            // that are nested as children of .feed element
            const entryList = document.querySelectorAll('.feed .entry-link');
            // each feed should contain at least one entry
            // can evaluate number of entries as children of feed
            expect(entryList.length > 0).toBe(true);
        });
        
    });
    
    describe('New Feed Selection', function() {
        // feed is test context for this suite, so creating target in suite's outer scope
        const feed = document.querySelector('.feed');
        // create empty array to store entry text
        let feedOne = [];

        // to run tests asynchronously relative to successive simulated loadFeed events,
        // must use done to check for finished status
        beforeEach(function(done) {
            // load initial feed container
            loadFeed(0);
            
            // create array from node list returned by feed.children
            const feedOneEntries = Array.from(feed.children);
            
            // iterate over each entry in the array and apply cb to push
            // each entry into feedOne
            feedOneEntries.forEach(function(entry) {
                feedOne.push(entry.innerText);
            });
            
            // simulate loading of next feed
            loadFeed(1, done);
        });

        it('content updates when feed is loaded', function() {
            // again create array from node list returned by this feed's children
            const feedTwoEntries = Array.from(feed.children);

            // looping over each entry in the second feed, apply cb
            // note that second parameter of forEach's cb is automatically
            // set to current index value
            feedTwoEntries.forEach(function(entry, index) {
                // test evaluates result of equality comparison, checking whether
                // innerText of entry in this feed collection is equal to innerText
                // stored in each item of feedOne array
                expect(entry.innerText === feedOne[index]).toBe(false);
            });
        });

        /** ######## Begin Attribution ########
         * Referenced means to create array from node list collection at
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from
         * on August 12, 2018
         * ######## End Attribution ########
         */

         /** ######## Begin Attribution ########
         * Reviewed means of iterating over array and applying callback function at
         * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
         * on August 12, 2018
         * ######## End Attribution ########
         */

         /** ######## Begin Attribution ########
         * Reviewed and abstracted helper code from
         * https://matthewcranford.com/feed-reader-walkthrough-part-4-async-tests/
         * on August 12, 2018
         * ######## End Attribution ########
         */
    });
}());
