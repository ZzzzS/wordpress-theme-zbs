    <?php get_header();?>
	<div id = "filterBar">
		<div id = "filter">
		<table id = "filterT" border="0" cellpadding="0">
			<tr>
				<th>年份
					<!--<td id="cancelYear" class="cancelCell"></td>-->
				</th>
				
				<td id="year"></td>
				<td id="cancelAll" class="cancelCell" rowspan="3"></td>
			</tr>
			<tr>
				<th>类别</th>
				<!--<td id="cancelType" class="cancelCell"></td>-->
				<td id="type"></td>
			</tr>
			<tr>
				<th>专业</th>
				<!--<td id="cancelMajor" class="cancelCell"></td>-->
				<td id="major"></td>
			</tr>
			<tr>
				<td colspan="4">
					<div id="btnGroup">
						<button type="button" class="" id="getUsers" title="作者"></button>
						<button type="button" class="" id="getPosts" title="作品"></button>
						<button type="button" class="" id="align" title="排列"></button>
					</div>
				</td>
			</tr>
		</table>


		
		</div>
		<button id="filterBarBtn"><span></span></button>
	</div>
	
	<div id="sketch"></div>
	
	<button id="perPage" title="上一页"></button>
	<button id="nextPage" title="下一页"></button>
	
	</div>
	
	<?php get_sidebar(); ?>
	<script src="<?php bloginfo('template_directory'); ?>/bootstrap/js/jquery-2.1.4.min.js" type="text/javascript"></script>
	<script src="<?php bloginfo('template_directory'); ?>/js/p5.js" type="text/javascript"></script>
	<script src="<?php bloginfo('template_directory'); ?>/js/p5.sound.js" type="text/javascript"></script>
	<script src="<?php bloginfo('template_directory'); ?>/js/infinite.js" type="text/javascript"></script>
	<?php get_footer();?>
