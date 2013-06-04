Object.defineProperty(Array.prototype, 'random', {
	value : function () {
		return this[Math.floor(Math.random() * this.length)];
	},
	configurable : true,
	writable : true
});
Object.defineProperty(Array.prototype, 'diff', {
  value: function(compareTo) {
    //filter: Creates a new array with all elements that pass the test implemented by the provided function.
    return this.filter(function(i) {
      return !(compareTo.indexOf(i.toLowerCase()) > -1);
    });
  },
  configurable : true,
 	writable : true
});


//these should definitely be stored in a collection
fourohfour = [
  '(ﾉಥДಥ)ﾉ︵┻━ᔭ0ᔭ━┻･/'
  ,'(ノ ゜Д゜)ノ ︵ ┻━ᔭ0ᔭ━┻'
  ,'(╯°□°)╯︵ ┻━ᔭ0ᔭ━┻ '
  ,'ʕノ•ᴥ•ʔノ ︵ ┻━ᔭ0ᔭ━┻'
];
title1 = ["Internal", "Global", "", "Senior", "Junior", "Chief", "Head", "Lead", "Middleweight", "Heavyweight", "Featherweight", "Super Featherweight", "Managing", "Executive", "Spear Head", "Entry Level", "OK", "Public", "General", "Hard Core", "Pansy", "Lightweight", "Big Deal", "Big Time", "Graduate", "Corporate", "Front End", "Back End", "Server Side", "Client Side", "Internet Explorer", "Advanced", "Major", "Super", "Key", "Arch", "Controlling", "Momentous", "Primary", "Primal", "Supreme", "Vital", "Weighty", "Number One", "Lord", "Expert", "Wise", "Very Wise", "Human", "Commanding", "Principal", "Crowning", "Incomparable", "Primary", "Unparalleled", "All-Time Greatest", "Single Handed", "World Class", "Unequaled", "Unmatched", "Unrivaled", "Second Rate", "Inferior", "Surpassable", "Free Thinking", ""];
title2 = ["PHP", "HTML", "UX", "UI", "Email", "Social Media", "Python", "Innovation", "Visual", "Ruby", "Design", "Content", "Information", "Data", "User", "MySQL", "NoSQL", "Type Face", "QR Code", "Mobile", "iOS", "Android", "Symbian", "Windows Phone 7", "Palm OS", "Palm", "Windows", "Windows XP", "Windows Vista", "Windows 8", "Mac", "OSX", "HTML5", "CSS", "CSS3", "Cloud", "Java", "FaceBook API", "API", "Real-Time", "Funding", "VC", "PR", "Press", "Public Relations", "User Satisfaction", "User Experience", "User Joy", "Beer Ordering", "Pizza Buying", "Java Script", "Finance", "Online", "Digital", "Community", "Entertaining", "Turd", "Pop Up", "Twitter", "YouTube", "Event", "Product", "Interaction", "Database", "Ruby On Rails", "C++", "Python", "C#", "Perl", "Wireframe", "Prototype", "Debugging", "Project", "Project Management", "Coder", "Integration", "Maintenance", "Requirements", "Software", "Testing", "IT Support", "Visual Basic", "Server", "Web", "Web Master", "Content Strategy", "Domain", "Party", "Security", "SEO", "White Space", "Beta Tester", "Responsive Design Testing", "Intranet", ""];
title3 = ["Officer", "Specialist", "Ninja", "God", "Rock Star", "Intern", "Cowboy", "Engineer", "n00b", "Architect", "Chino Wearer", "Hipster", "Godfather", "Editor", "Demon", "Legend", "Lad", "Dude", "Chick", "Hipster Chick", "Big Dog", "Go To Man", "Daddy", "Monkey", "Stallion", "Cleaner", "Bin Emptier", "Player", "Developer", "Builder", "Inventor", "Manipulator", "Planner", "Surveyor", "Champion", "Star", "Strategist", "Polisher", "Shipper", "Doer", "Breaker", "Fixer", "Researcher", "Guru", "Genius", "Evangelist", "Extraordinaire", "Conductor", "Captain", "Controller", "Scout", "Pioneer", "Shepherd", "Dictator", "Champ", "Analyst", "Tester", "Specification Writer", "Networker", "Buyer", "Hippie", "Old Timer", "Writer", "Nut", "Blogger", "Adjudicator", "Go-Between", "Middle Person", "Umpire", "Moderator"];
stoptags = [
  'facebook',
  'google',
  'yahoo',
  'ifttt',
  'googlereader',
  'twitter',
  'twitterlink',
  'smashingmag',
  '04:22pm',
  'objective-c',
  '2012',
  'music',
  'pocket',
  'kindle',
  '201310',
  '999'
];
techterms = ['AddOn', 'Algorithm', 'Architect', 'Array', 'Asynchronous', 'Avatar', 'Band', 'Base', 'Beta', 'Binary', 'Blog', 'Board', 'Boolean', 'Boot', 'Bot', 'Browser', 'Bug', 'Cache', 'Character', 'Checksum', 'Chip', 'Circuit', 'Client', 'Cloud', 'Cluster', 'Code', 'Codec', 'Coder', 'Column', 'Command', 'Compile', 'Compression', 'Computing', 'Console', 'Constant', 'Control', 'Cookie', 'Core', 'Cyber', 'Default', 'Deprecated', 'Dev', 'Developer', 'Development', 'Device', 'Digital', 'Domain', 'Dynamic', 'Emulation', 'Encryption', 'Engine', 'Error', 'Exception', 'Exploit', 'Export', 'Extension', 'File', 'Font', 'Fragment', 'Frame', 'Function', 'Group', 'Hacker', 'Hard', 'HTTP', 'Icon', 'Input', 'IT', 'Kernel', 'Key', 'Leak', 'Link', 'Load', 'Logic', 'Mail', 'Mashup', 'Mega', 'Meme', 'Memory', 'Meta', 'Mount', 'Navigation', 'Net', 'Node', 'Open', 'OS', 'Output', 'Over', 'Packet', 'Page', 'Parallel', 'Parse', 'Path', 'Phone', 'Ping', 'Pixel', 'Port', 'Power', 'Programmers', 'Programs', 'Protocol', 'Push', 'Query', 'Queue', 'Raw', 'Real', 'Repository', 'Restore', 'Root', 'Router', 'Run', 'Safe', 'Sample', 'Scalable', 'Script', 'Server', 'Session', 'Shell', 'Smart', 'Socket', 'Soft', 'Solid', 'Sound', 'Source', 'Streaming', 'Symfony', 'Syntax', 'System', 'Tag', 'Tape', 'Task', 'Template', 'Thread', 'Token', 'Tool', 'Tweak', 'URL', 'Utility', 'Viral', 'Volume', 'Ware', 'Web', 'Wiki', 'Window', 'Wire'];
culinaryterms = ['Appetit', 'Bake', 'Beurre', 'Bistro', 'Blend', 'Boil', 'Bouchees', 'Brew', 'Buffet', 'Caffe', 'Caffeine', 'Cake', 'Carve', 'Caviar', 'Chef', 'Chocolate', 'Chop', 'Citrus', 'Cocoa', 'Compote', 'Cook', 'Cooker', 'Cookery', 'Cool', 'Core', 'Coulis', 'Course', 'Crouton', 'Cuisine', 'Dash', 'Dessert', 'Dip', 'Dish', 'Dress', 'Entree', 'Espresso', 'Extracts', 'Fajitas', 'Fibers', 'Fold', 'Formula', 'Fruit', 'Fumet', 'Fusion', 'Gastronomy', 'Glucose', 'Gourmet', 'Grains', 'Gratin', 'Greens', 'Guacamole', 'Herbs', 'Honey', 'Hybrid', 'Ice', 'Icing', 'Immersion', 'Induction', 'Instant', 'Jasmine', 'Jelly', 'Juice', 'Kiwi', 'Lean', 'Leek', 'Legumes', 'Lemon', 'Lime', 'Liqueur', 'Madeleine', 'Mango', 'Marinate', 'Melon', 'Mill', 'Mince', 'Mirepoix', 'Mix', 'Mousse', 'Muffin', 'Mull', 'Munster', 'Nectar', 'Nut', 'Olive', 'Organic', 'Organic', 'Pan', 'Papillote', 'Pare', 'Pasta', 'Pate', 'Peanut', 'Pear', 'Pesto', 'Picante', 'Pie', 'Pigment', 'Pinot', 'Plate', 'Plum', 'Pod', 'Prepare', 'Pressure', 'Pudding', 'Pulp', 'Quiche', 'Rack', 'Raft', 'Raisin', 'Rape', 'Recipe', 'Reduce', 'Relish', 'Render', 'Risotto', 'Rosemary', 'Roux', 'Rub', 'Salad', 'Salsa', 'Sauce', 'Sauté', 'Season', 'Slice', 'Smoked', 'Soft', 'Sorbet', 'Soup', 'Spaghetti', 'Specialty', 'Spicy', 'Splash', 'Steam', 'Stem', 'Sticky', 'Stuff', 'Sugar', 'Supreme', 'Sushi', 'Sweet', 'Table', 'Tart', 'Taste', 'Tasting', 'Tea', 'Tender', 'Terrine', 'Tomato', 'Vanilla', 'Wash', 'Wax', 'Wine', 'Wok', 'Zest'];
astart = [
  'you won\'t believe how x I got last y'

]