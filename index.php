    <?php get_header();?>
	<div id="logo"><img src="<?php bloginfo('template_directory'); ?>/weblogo-06.png" width="200"/></div>
	<div id="sketch"></div>
	<div id="sketch1"></div>
	<div id="sketch2"></div>
	<div id="info"></div>

	<div class="btn-group-vertical" role="group" aria-label="..." id="buttonGroup">
		<button type="button" class="btn btn-default" id="getUsers">getUsers</button>
		<button type="button" class="btn btn-default" id="getPosts">getPosts</button>
		<button type="button" class="btn btn-default" id="align">align</button>
	</div>
	
	<?php get_sidebar(); ?>
	<script src="<?php bloginfo('template_directory'); ?>/bootstrap/js/jquery-2.1.4.min.js" type="text/javascript"></script>
	<!--<script src="<?php bloginfo('template_directory'); ?>/js/util.js" type="text/javascript"></script>-->
	<script src="<?php bloginfo('template_directory'); ?>/js/p5.js" type="text/javascript"></script>
	<script src="<?php bloginfo('template_directory'); ?>/js/p5.sound.js" type="text/javascript"></script>
	<!--<script src="<?php bloginfo('template_directory'); ?>/js/DomCtrl.js" type="text/javascript"></script>-->
	<!--<script src="<?php bloginfo('template_directory'); ?>/js/Button.js" type="text/javascript"></script>
	<script src="<?php bloginfo('template_directory'); ?>/js/AttractPoint.js" type="text/javascript"></script>
	<script src="<?php bloginfo('template_directory'); ?>/js/AdvancedButton.js" type="text/javascript"></script>
	<script src="<?php bloginfo('template_directory'); ?>/js/getInfo.js" type="text/javascript"></script>-->
	<script src="<?php bloginfo('template_directory'); ?>/js/infinite.js" type="text/javascript"></script>
	<?php get_footer();?>
