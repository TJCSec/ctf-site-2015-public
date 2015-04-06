---
title: Scoreboard
layout: default
post_scripts: ['//cdnjs.cloudflare.com/ajax/libs/handlebars.js/3.0.1/handlebars.min.js','https://rawgit.com/zwade/e74701326ff542448fd2/raw/4391d859749cbffc11c8ede88b69c06f7a2b607f/Spark.js','/js/scoreboard.js']
stylesheets: ['/css/scoreboard.css']
---
{% raw %}
<script id = "score-entry" type="text/x-handlebars-template">
	
	{{#if schoolLim}}
	<div id="alert">
		Only showing teams from {{schoolLim}}. Click <a onclick="lim('')">here</a> to show all schools.
	</div>
	{{/if}}
	<table id="scores">
		<tr class="header">
			<td class="nu">Place</td>
			<td>Team Name</td>
			<td>School</td>
			<td class="nu">Score</td>
		</tr>
		{{#each scoreboard}}
		{{#display school}}
		<tr class="{{parity @index}}">
			<td class="nu">{{inc @index}}</td>
			<td>{{name}}</td>
			<td><a onclick="lim('{{school}}')">{{school}}</td>
			<td class="nu">{{score}}</td>
		</tr>
		{{/display}}
		{{/each}}
	</table>
<tr>
</script>

{% endraw %}


<div id="table-parent">
	<div id="body"></div>
</div>