function hamburger(){

	document.getElementById('lineOne').className = "hambitem";
	document.getElementById('lineTwo').className = "hambitem";
	document.getElementById('lineThree').className = "hambitem";
	document.getElementById('lineFour').className = "hambitem";
	document.getElementById('lineFive').className = "hambitem";

	var x = document.getElementsByClassName("hambitem");
	x[0].innerHTML = '<a href="file:///C:/Users/smartsupp/Documents/ALEX/webova-stranka/site/About/about.html">' +  "About me" + '</a>';
	x[1].innerHTML = '<a href="file:///C:/Users/smartsupp/Documents/ALEX/webova-stranka/site/Contact/contact.html">' +  "Contact" + '</a>';
	x[2].innerHTML = '<a href="file:///C:/Users/smartsupp/Documents/ALEX/webova-stranka/site/Roadmap/roadmap.html">' +  "Roadmap" + '</a>';
	x[3].innerHTML = '<a href="file:///C:/Users/smartsupp/Documents/ALEX/webova-stranka/site/Curriculum/curriculum.html">' +  "Curriculum" + '</a>';
	x[3].innerHTML = '<a href="file:///C:/Users/smartsupp/Documents/ALEX/webova-stranka/site/Blog/blog.html">' +  "Blog" + '</a>';
}