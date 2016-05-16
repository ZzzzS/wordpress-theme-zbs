<!DOCTYPE html>
<html lang="zh">
  <head>
    <meta charset="utf-8">
    <title><?php
		// 如果是首页和文章列表页面, 显示博客标题
		if(is_front_page() || is_home()) {
		bloginfo('name');
		// 如果是文章详细页面和独立页面, 显示文章标题
		} else if(is_single() || is_page()) {
		wp_title('');
		// 如果是类目页面, 显示类目表述
		} else if(is_category()) {
		printf('%1$s 类目的文章存档', single_cat_title('', false));
		// 如果是搜索页面, 显示搜索表述
		} else if(is_search()) {
		printf('%1$s 的搜索结果', wp_specialchars($s, 1));
		// 如果是标签页面, 显示标签表述
		} else if(is_tag()) {
		printf('%1$s 标签的文章存档', single_tag_title('', false));
		// 如果是日期页面, 显示日期范围描述
		} else if(is_date()) {
		$title = '';
		if(is_day()) {
		$title = get_the_time('Y年n月j日');
		} else if(is_year()) {
		$title = get_the_time('Y年');
		} else {
		$title = get_the_time('Y年n月');
		}
		printf('%1$s的文章存档', $title);
		// 其他页面显示博客标题
		} else {
		bloginfo('name');
		}
	?></title>
	
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
	
	
    <!-- Le styles -->
	<link href="<?php bloginfo('stylesheet_url');?>" rel="stylesheet">

    <!-- Le HTML5 shim, for IE6-8 support of HTML5 elements -->
    <!--[if lt IE 9]>
      <script src="http://html5shim.googlecode.com/svn/trunk/html5.js"></script>
    <![endif]-->
	</head>
<body>
	<div id="navigation_bar">
		<a href=<?php bloginfo('url')?>><img id="logo" src="<?php bloginfo('template_directory'); ?>/logo.png" /></a>
		<div id="rightCtrlBar">
			<form name="search">
				<input type="text" name="search-input" />
				<button type="submit" value="Submit" id="searchSubmit"></button>
			</form>
		</div>
	</div>
