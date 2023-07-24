<script lang="ts">

</script>

<div class="addreview">
	<h2 class="addreview__title">Add review</h2>
	<form class="addreview__form">
		<input type="text" placeholder="Name"/>
		<div class="addreview__grade">
			<p class="addreview__gradetext">Grade</p>
		<select class="addreview__gradelist">
			<option value="grade__0">Choose grade</option>
			<option value="grade__1">1</option>
			<option value="grade__2">2</option>
			<option value="grade__3">3</option>
			<option value="grade__4">4</option>
			<option value="grade__5">5</option>
		  </select>
		</div>
		<input type="text" placeholder="Review"/>
		<button type="submit" id="add" class="addreview__submit">Submit</button>
	</form>
</div>
