## bloglist frontend
<h1>Full Stack Open frontend</h1>
<h2>Made for MOO course https://fullstackopen.github.io<br />
Section https://fullstackopen.github.io/tehtävät/#osa-5 (5.1-5.4 done)</h2>

<h3>Structure:</h3>
<strong>public</strong>
<ul>
	<li>favicon.ico</li>
	<li>index.html (HTML file, if you want to change the title or something)</li>
	<li>manifest.json (Android homescreen metadata)</li>
</ul>
<strong>src</strong>
<ul>
  <strong>components</strong>
  <ul>
    <li>Blog.js (Blog view)</li>
    <li>CreatePostForm.js (Form for blog post creation)</li>
    <li>LoginForm.js (Login form)</li>
  </ul>
  <strong>services</strong>
  <ul>
    <li>blogs.js (API communication handler for the blog items)</li>
    <li>login.js (API communication handler for login)</li>
  </ul>
  <li>App.js (App main file. Rendering App and its associated functions)</li>
  <li>index.js (Main hub file. Connects App to the DOM)</li>
</ul>
<p>package-lock.json (Ensures that npm install installs the same versions everywhere)</p>
<p>package.json (metadata, dependencies, scripts and some configuration)</p>