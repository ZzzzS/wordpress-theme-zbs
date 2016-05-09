    <?php get_header();?>
	<div id = "filterBar">
		<div id = "filter">
		<table id = "filterT" border="1" cellpadding="10">
			<tr>
				<th>年份</th>
				<td id="year"></td>
			</tr>
			<tr>
				<th>类别</th>
				<td id="type"></td>
			</tr>
			<tr>
				<th>专业</th>
				<td id="major"></td>
			</tr>
			<tr>
				<td colspan="2">
					<div id="btnGroup">
						<button type="button" class="btn btn-default btn-sm" id="getUsers">getUsers</button>
						<button type="button" class="btn btn-default btn-sm" id="getPosts">getPosts</button>
						<button type="button" class="btn btn-default btn-sm" id="align">align</button>
					</div>
				</td>
			</tr>
		</table>


		
		</div>
		<button id="filterBarBtn"><span></span></button>
	</div>
	
	<div id="sketch"></div>

	<div id="info"></div>

	<div class="btn-group-vertical" role="group" aria-label="..." id="buttonGroup">
		
	</div>
	
	<?php get_sidebar(); ?>
	<script src="<?php bloginfo('template_directory'); ?>/bootstrap/js/jquery-2.1.4.min.js" type="text/javascript"></script>
	<script src="<?php bloginfo('template_directory'); ?>/js/p5.js" type="text/javascript"></script>
	<script src="<?php bloginfo('template_directory'); ?>/js/p5.sound.js" type="text/javascript"></script>
	<script src="<?php bloginfo('template_directory'); ?>/js/infinite.js" type="text/javascript"></script>
	<?php get_footer();?>
