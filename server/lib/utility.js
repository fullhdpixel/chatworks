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
  '(ﾉಥДಥ)ﾉ︵┻━404━┻･/'
  ,'(ノ ゜Д゜)ノ ︵ ┻━404━┻'
  ,'(╯°□°)╯︵ ┻━404━┻ '
  ,'ʕノ•ᴥ•ʔノ ︵ ┻━404━┻'
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
  'music'
];