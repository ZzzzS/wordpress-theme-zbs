<?php
//require_once(TEMPLATEPATH . '/simple-local-avatars.php');
add_theme_support('nav_menus');

if(function_exists('register_nav_menus')){
	register_nav_menus(
		array(
			'header_menu' => '顶部菜单',
			'footer_menu' => '底部菜单',
			'friendly_link' => '友情链接'
		)
	);
}




class Bootstrap_Walker extends Walker_Nav_Menu
{
 
	/* Start of the <ul>
	*
	* Note on $depth: Counterintuitively, $depth here means the "depth right before we start this menu".
	* So basically add one to what you'd expect it to be
	*/
	function start_lvl(&$output, $depth)
	{
		$tabs = str_repeat("\t", $depth);
		// If we are about to start the first submenu, we need to give it a dropdown-menu class
		if ($depth == 0 || $depth == 1) { //really, level-1 or level-2, because $depth is misleading here (see note above)
			$output .= "\n{$tabs}<ul class=\"dropdown-menu\">\n";
		} else {
			$output .= "\n{$tabs}<ul>\n";
		}
		return;
	}
 
	/* End of the <ul>
	*
	* Note on $depth: Counterintuitively, $depth here means the "depth right before we start this menu".
	* So basically add one to what you'd expect it to be
	*/
	function end_lvl(&$output, $depth)
	{
		if ($depth == 0) { // This is actually the end of the level-1 submenu ($depth is misleading here too!)
		 
			// we don't have anything special for Bootstrap, so we'll just leave an HTML comment for now
			$output .= '<!--.dropdown-->';
		}
		$tabs = str_repeat("\t", $depth);
		$output .= "\n{$tabs}</ul>\n";
		return;
	}
	 
	/* Output the <li> and the containing <a>
	* Note: $depth is "correct" at this level
	*/
	function start_el(&$output, $item, $depth, $args)
	{
		global $wp_query;
		$indent = ( $depth ) ? str_repeat( "\t", $depth ) : '';
		$class_names = $value = '';
		$classes = empty( $item->classes ) ? array() : (array) $item->classes;
		 
		/* If this item has a dropdown menu, add the 'dropdown' class for Bootstrap */
		if ($item->hasChildren) {
			$classes[] = 'dropdown';
			// level-1 menus also need the 'dropdown-submenu' class
			if($depth == 1) {
				$classes[] = 'dropdown-submenu';
			}
		}
	 
		/* This is the stock Wordpress code that builds the <li> with all of its attributes */
		$class_names = join( ' ', apply_filters( 'nav_menu_css_class', array_filter( $classes ), $item ) );
		$class_names = ' class="' . esc_attr( $class_names ) . '"';
		$output .= $indent . '<li id="menu-item-'. $item->ID . '"' . $value . $class_names .'>';
		$attributes = ! empty( $item->attr_title ) ? ' title="' . esc_attr( $item->attr_title ) .'"' : '';
		$attributes .= ! empty( $item->target ) ? ' target="' . esc_attr( $item->target ) .'"' : '';
		$attributes .= ! empty( $item->xfn ) ? ' rel="' . esc_attr( $item->xfn ) .'"' : '';
		$attributes .= ! empty( $item->url ) ? ' href="' . esc_attr( $item->url ) .'"' : '';
		$item_output = $args->before;
		 
		/* If this item has a dropdown menu, make clicking on this link toggle it */
		if ($item->hasChildren && $depth == 0) {
			$item_output .= '<a'. $attributes .' class="dropdown-toggle" data-toggle="dropdown">';
		} else {
			$item_output .= '<a'. $attributes .'>';
		}
		 
		$item_output .= $args->link_before . apply_filters( 'the_title', $item->title, $item->ID ) . $args->link_after;
		 
		/* Output the actual caret for the user to click on to toggle the menu */
		if ($item->hasChildren && $depth == 0) {
			$item_output .= '<b class="caret"></b></a>';
		} else {
			$item_output .= '</a>';
		}
		 
		$item_output .= $args->after;
		$output .= apply_filters( 'walker_nav_menu_start_el', $item_output, $item, $depth, $args );
		return;
	}
	 
	/* Close the <li>
	* Note: the <a> is already closed
	* Note 2: $depth is "correct" at this level
	*/
	function end_el (&$output, $item, $depth, $args)
	{
		$output .= '</li>';
		return;
	}
	 
	/* Add a 'hasChildren' property to the item
	* Code from: http://wordpress.org/support/topic/how-do-i-know-if-a-menu-item-has-children-or-is-a-leaf#post-3139633
	*/
	function display_element ($element, &$children_elements, $max_depth, $depth = 0, $args, &$output)
	{
		// check whether this item has children, and set $item->hasChildren accordingly
		$element->hasChildren = isset($children_elements[$element->ID]) && !empty($children_elements[$element->ID]);
	 
		// continue with normal behavior
		return parent::display_element($element, $children_elements, $max_depth, $depth, $args, $output);
	}
}


/*
 * 给激活的导航菜单添加 .active
 */
function mytheme_nav_menu_css_class( $classes ) {
     if ( in_array('current-menu-item', $classes ) OR in_array( 'current-menu-ancestor', $classes ) )
          $classes[]     =     'active';
     return $classes;
}
add_filter( 'nav_menu_css_class', 'mytheme_nav_menu_css_class' );





/**
    *WordPress 文章列表分页导航
*/
function par_pagenavi($range = 9){
	global $paged, $wp_query;
	if ( !$max_page ) {$max_page = $wp_query->max_num_pages;}
	if($max_page > 1){if(!$paged){$paged = 1;}
	if($paged != 1){echo " 返回首页 ";}
	previous_posts_link(' 上一页 ');
    if($max_page > $range){
		if($paged < $range){for($i = 1; $i <= ($range + 1); $i++){echo "$i";}}
    elseif($paged >= ($max_page - ceil(($range/2)))){
		for($i = $max_page - $range; $i <= $max_page; $i++){echo "$i";}}
	elseif($paged >= $range && $paged < ($max_page - ceil(($range/2)))){
		for($i = ($paged - ceil($range/2)); $i <= ($paged + ceil(($range/2))); $i++){echo "$i";}}}
    else{for($i = 1; $i <= $max_page; $i++){echo "$i";}}
	next_posts_link(' 下一页 ');
    if($paged != $max_page){echo " 最后一页 ";}}
}


	function get_post_first_few_words($number){
		global $post;
		$postContent = $post->post_content;
		echo mb_strimwidth($postContent,0,$number,'...','UTF-8');
	}
	
	
	//使WordPress支持post thumbnail
if ( function_exists( 'add_theme_support' ) ) {
    add_theme_support( 'post-thumbnails' );
}

 
if ( function_exists( 'add_image_size' ) ) {
    add_image_size( 'customized-post-thumb', 200, 100,true );
	
add_image_size( 'category-thumb', 300, 9999 ); // 宽度是300px（高度无限）
add_image_size( 'large-thumb', 600, 9999 ); 
add_image_size( 'homepage-thumb', 100, 100, true ); //（裁切为 220px x 180px ）
}




/** widgets */
if( function_exists('register_sidebar') ) {
 register_sidebar(array(
 'name' => '主侧栏',
 'before_widget' => '<div class="sidebar-box">',
 'after_widget' => '</div>',
 'before_title' => '<h5>',
 'after_title' => '</h5>'
 ));
}




//增强编辑器开始
function add_editor_buttons($buttons) {
$buttons[] = 'fontselect';
$buttons[] = 'fontsizeselect';
$buttons[] = 'cleanup';
$buttons[] = 'styleselect';

$buttons[] = 'del';
$buttons[] = 'sub';
$buttons[] = 'sup';
$buttons[] = 'copy';
$buttons[] = 'paste';
$buttons[] = 'cut';

$buttons[] = 'image';
$buttons[] = 'anchor';
$buttons[] = 'backcolor';
$buttons[] = 'wp_page';

return $buttons;
}
add_filter("mce_buttons_3", "add_editor_buttons");

//增强编辑器结束




function below_the_title() {
    // 在编辑器下方添加的提示内容
	$tips="
	<div style='margin:30px 0 30px 0;background-color:#ddd;border:solid;border-color:gray;border-width:1px;border-radius:10px;
	-moz-border-radius:10px;'>
		<h3 style='color:red'>发文注意事项:</h3>
	</div>
	";
    echo $tips;
}
 
//add_action( 'edit_form_after_title', 'below_the_title' );
 
/*function below_the_editor() {
    echo '<h4>在编辑器下方添加的提示内容</h4>';
}
 
add_action( 'edit_form_after_editor', 'below_the_editor' );*/


global $texonomy_slug_color;
$texonomy_slug_color='category';
add_action($texonomy_slug_color.'_add_form_fields','categorycolor');
function categorycolor($taxonomy){ ?>
    <div>
    <label for="tag-color">分类颜色</label>
    <input type="text" name="tag-color" id="tag-color" value="" /><br /><span>请在此输入分类颜色。</span>    
</div>
<?php }
add_action($texonomy_slug_color.'_edit_form_fields','categorycoloredit');
function categorycoloredit($taxonomy){ ?>
<tr class="form-field">
    <th scope="row" valign="top"><label for="tag-color">颜色</label></th>
    <td><div style="float:left;width:28px;height:28px;background-color:<?php echo get_option('_category_color'.$taxonomy->term_id); ?>;margin-right:5px;border-radius:5px;-moz-border-radius:5px;"></div><input style="width:200px;" type="text" name="tag-color" id="tag-color" value="<?php echo get_option('_category_color'.$taxonomy->term_id); ?>" /><br /><span class="description">请在此输入分类颜色。</span></td>
</tr>              
<?php  }
add_action('edit_term','categorycolorsave');
add_action('create_term','categorycolorsave');
function categorycolorsave($term_id){
    if(isset($_POST['tag-color'])){
        if(isset($_POST['tag-color']))
            update_option('_category_color'.$term_id,$_POST['tag-color'] );
    }
}




/**
 * 为WordPress后台的文章、分类等显示ID
 */
// 添加一个新的列 ID
function ssid_column($cols) {
	$cols['ssid'] = 'ID';
	return $cols;
}

// 添加一个新的列 -颜色
function sscolor_column($cols) {
	$cols['sscolor'] = '颜色';
	return $cols;
}
 
// 显示 ID
function ssid_value($column_name, $id) {
	if ($column_name == 'ssid')
		echo $id;
}

 
function ssid_return_value($value, $column_name, $id) {
	if ($column_name == 'ssid')
		$value = $id;
	return $value;
}


 
// 为 ID 这列添加css 
function ssid_css() {
?>
<style type="text/css">
	#ssid { width: 50px; } /* Simply Show IDs */
	#sscolor { width: 50px; } /* Simply Show IDs */
</style>
<?php	
}
 
// 通过动作/过滤器输出各种表格和CSS
function ssid_add() {
	add_action('admin_head', 'ssid_css');

	foreach ( get_taxonomies(array('name'=> 'category')) as $taxonomy ) {
		add_action("manage_edit-${taxonomy}_columns", 'ssid_column');

		function sscolor_value($column_name ,$id) {
			if ($column_name == 'sscolor')
				echo get_option('_category_color'.$id);
		}
		add_action("manage_edit-${taxonomy}_columns", 'sscolor_column');
		add_filter("manage_${taxonomy}_custom_column", 'ssid_return_value', 10, 3);
		
		function sscolor_return_value($value, $column_name ,$id) {
			if ($column_name == 'sscolor')
				$value = "<div style='float:left;width:28px;height:28px;background-color:".get_option('_category_color'.$id).";margin:5px 5px 0 0;border-radius:5px;-moz-border-radius:5px;'></div>";
			return $value;
		}
		add_filter("manage_${taxonomy}_custom_column", 'sscolor_return_value', 10, 3);
	}	
}
 
add_action('admin_init', 'ssid_add');



/**
 * 自定义用户个人资料信息
 * 
 */
add_filter( 'user_contactmethods', 'wpdaxue_add_contact_fields' );
function wpdaxue_add_contact_fields( $contactmethods ) {
	/*$contactmethods['qq'] = 'QQ';
	$contactmethods['qm_mailme'] = 'QQ邮箱“邮我”';
	$contactmethods['qq_weibo'] = '腾讯微博';
	$contactmethods['sina_weibo'] = '新浪微博';
	$contactmethods['twitter'] = 'Twitter';
	$contactmethods['google_plus'] = 'Google+';
	$contactmethods['donate'] = '赞助链接';*/
	//unset( $contactmethods['google_plus'] );
	return $contactmethods;
}


//添加新角色
add_role('basic_contributor', '精英用户', array(
    'read' => true, // 使用 true 表示包含这个权限
    'edit_posts' => true,
    'delete_posts' => false, // 使用 false 表示不包含这个权限
));
//remove_role( 'basic_contributor' );