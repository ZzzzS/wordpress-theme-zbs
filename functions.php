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
    *http://www.endskin.com/page-navi/
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
	$tips="
	<div style='margin:30px 0 30px 0;background-color:#ddd;border:solid;border-color:gray;border-width:1px;border-radius:10px;
	-moz-border-radius:10px;'>
		<h3 style='color:red'>发文注意事项:</h3>
	</div>
	";
    echo $tips;
}
 
add_action( 'edit_form_after_title', 'below_the_title' );
 
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
 * 为WordPress后台的文章、分类等显示ID From wpdaxue.com
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
 * http://www.wpdaxue.com/add-remove-display-wordpress-user-profile-fields.html
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


/**
 * WordPress 个人资料添加额外的字段
 * http://www.wpdaxue.com/extra-user-profile-fields.html
 */
/*add_action( 'show_user_profile', 'extra_user_profile_fields' );
add_action( 'edit_user_profile', 'extra_user_profile_fields' );
 
function extra_user_profile_fields( $user ) { ?>
<h3><?php _e("额外信息", "blank"); ?></h3>
 
<table class="form-table">
	<tr>
		<th><label for="facebook"><?php _e("Facebook URL"); ?></label></th>
		<td>
			<input type="text" name="facebook" id="facebook" value="<?php echo esc_attr( get_the_author_meta( 'facebook', $user->ID ) ); ?>" class="regular-text" /><br />
			<span class="description"><?php _e("请输入您的 Facebook 地址"); ?></span>
		</td>
	</tr>
	<tr>
		<th><label for="twitter"><?php _e("Twitter"); ?></label></th>
		<td>
			<input type="text" name="twitter" id="twitter" value="<?php echo esc_attr( get_the_author_meta( 'twitter', $user->ID ) ); ?>" class="regular-text" /><br />
			<span class="description"><?php _e("请输入您的 Twitter 用户名"); ?></span>
		</td>
	</tr>
</table>
<?php }
 
add_action( 'personal_options_update', 'save_extra_user_profile_fields' );
add_action( 'edit_user_profile_update', 'save_extra_user_profile_fields' );*/
 
/*function save_extra_user_profile_fields( $user_id ) {
 
	if ( !current_user_can( 'edit_user', $user_id ) ) { return false; }
 
	update_usermeta( $user_id, 'facebook', $_POST['facebook'] );
	update_usermeta( $user_id, 'twitter', $_POST['twitter'] );
}


//添加新角色
add_role('basic_contributor', '精英用户', array(
    'read' => true, // 使用 true 表示包含这个权限
    'edit_posts' => flase,
    'delete_posts' => false, // 使用 false 表示不包含这个权限
));*/
//remove_role( 'basic_contributor' );

function my_custom_post_product() {
  $labels = array(
    'name'               => _x( 'Products', 'post type 名称' ),
    'singular_name'      => _x( 'Product', 'post type 单个 item 时的名称，因为英文有复数' ),
    'add_new'            => _x( '新建作品', '添加新内容的链接名称' ),
    'add_new_item'       => __( '新建一个作品' ),
    'edit_item'          => __( '编辑作品' ),
    'new_item'           => __( '新作品' ),
    'all_items'          => __( '所有作品' ),
    'view_item'          => __( '查看作品' ),
    'search_items'       => __( '搜索作品' ),
    'not_found'          => __( '没有找到有关作品' ),
    'not_found_in_trash' => __( '回收站里面没有相关作品' ),
    'parent_item_colon'  => '',
    'menu_name'          => '作品'
  );
  $args = array(
    'labels'        => $labels,
    'description'   => '我们网站的所有作品信息',
    'public'        => true,
    'menu_position' => 5,
    'supports'      => array( 'title', 'editor', 'thumbnail', 'excerpt', 'comments', ),
    'has_archive'   => true
  );
  register_post_type( 'product', $args );
}
add_action( 'init', 'my_custom_post_product' );

function my_taxonomies_product() {
  $labels = array(
    'name'              => _x( '作品分类', 'taxonomy 名称' ),
    'singular_name'     => _x( '作品分类', 'taxonomy 单数名称' ),
    'search_items'      => __( '搜索作品分类' ),
    'all_items'         => __( '所有作品分类' ),
    'parent_item'       => __( '该作品分类的上级分类' ),
    'parent_item_colon' => __( '该作品分类的上级分类：' ),
    'edit_item'         => __( '编辑作品分类' ),
    'update_item'       => __( '更新作品分类' ),
    'add_new_item'      => __( '添加新的作品分类' ),
    'new_item_name'     => __( '新作品分类' ),
    'menu_name'         => __( '作品分类' ),
  );
  $args = array(
    'labels' => $labels,
    'hierarchical' => true,
  );
  register_taxonomy( 'product_category', 'product', $args );
}
add_action( 'init', 'my_taxonomies_product', 0 );


add_action( 'add_meta_boxes', 'product_theme' );
function product_theme() {
    add_meta_box(
        'product_theme',
        '主题',
        'product_theme_meta_box',
        'product',
        'side',
        'low'
    );
}

function product_theme_meta_box($post) {

    // 创建临时隐藏表单，为了安全
    wp_nonce_field( 'product_theme_meta_box', 'product_theme_meta_box_nonce' );
    // 获取之前存储的值
    $value = get_post_meta( $post->ID, '_product_theme', true );

    ?>

    <label for="product_theme"></label>
    <input type="text" id="product_theme" name="product_theme" value="<?php echo esc_attr( $value ); ?>" placeholder="输入作品主题" >

    <?php
}

add_action( 'save_post', 'product_theme_save_meta_box' );
function product_theme_save_meta_box($post_id){

    // 安全检查
    // 检查是否发送了一次性隐藏表单内容（判断是否为第三者模拟提交）
    if ( ! isset( $_POST['product_theme_meta_box_nonce'] ) ) {
        return;
    }
    // 判断隐藏表单的值与之前是否相同
    if ( ! wp_verify_nonce( $_POST['product_theme_meta_box_nonce'], 'product_theme_meta_box' ) ) {
        return;
    }
    // 判断该用户是否有权限
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    // 判断 Meta Box 是否为空
    if ( ! isset( $_POST['product_theme'] ) ) {
        return;
    }

    $product_theme = sanitize_text_field( $_POST['product_theme'] );
    update_post_meta( $post_id, '_product_theme', $product_theme );

}



add_action( 'add_meta_boxes', 'product_material' );
function product_material() {
    add_meta_box(
        'product_material',
        '材料',
        'product_material_meta_box',
        'product',
        'side',
        'low'
    );
}

function product_material_meta_box($post) {

    // 创建临时隐藏表单，为了安全
    wp_nonce_field( 'product_material_meta_box', 'product_material_meta_box_nonce' );
    // 获取之前存储的值
    $value = get_post_meta( $post->ID, '_product_material', true );

    ?>

    <label for="product_material"></label>
    <input type="text" id="product_material" name="product_material" value="<?php echo esc_attr( $value ); ?>" placeholder="输入作品所用的材料" >

    <?php
}

add_action( 'save_post', 'product_material_save_meta_box' );
function product_material_save_meta_box($post_id){

    // 安全检查
    // 检查是否发送了一次性隐藏表单内容（判断是否为第三者模拟提交）
    if ( ! isset( $_POST['product_material_meta_box_nonce'] ) ) {
        return;
    }
    // 判断隐藏表单的值与之前是否相同
    if ( ! wp_verify_nonce( $_POST['product_material_meta_box_nonce'], 'product_material_meta_box' ) ) {
        return;
    }
    // 判断该用户是否有权限
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    // 判断 Meta Box 是否为空
    if ( ! isset( $_POST['product_material'] ) ) {
        return;
    }

    $product_material = sanitize_text_field( $_POST['product_material'] );
    update_post_meta( $post_id, '_product_material', $product_material );

}




add_action( 'add_meta_boxes', 'product_major' );
function product_major() {
    add_meta_box(
        'product_major',
        '专业类别',
        'product_major_meta_box',
        'product',
        'side',
        'low'
    );
}

function product_major_meta_box($post) {

    // 创建临时隐藏表单，为了安全
    wp_nonce_field( 'product_major_meta_box', 'product_major_meta_box_nonce' );
    // 获取之前存储的值
    $value = get_post_meta( $post->ID, '_product_major', true );

    ?>

    <label for="product_major"></label>
    <input type="text" id="product_major" name="product_major" value="<?php echo esc_attr( $value ); ?>" placeholder="输入作品所属的专业类别" >

    <?php
}

add_action( 'save_post', 'product_major_save_meta_box' );
function product_major_save_meta_box($post_id){

    // 安全检查
    // 检查是否发送了一次性隐藏表单内容（判断是否为第三者模拟提交）
    if ( ! isset( $_POST['product_major_meta_box_nonce'] ) ) {
        return;
    }
    // 判断隐藏表单的值与之前是否相同
    if ( ! wp_verify_nonce( $_POST['product_major_meta_box_nonce'], 'product_major_meta_box' ) ) {
        return;
    }
    // 判断该用户是否有权限
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    // 判断 Meta Box 是否为空
    if ( ! isset( $_POST['product_major'] ) ) {
        return;
    }

    $product_major = sanitize_text_field( $_POST['product_major'] );
    update_post_meta( $post_id, '_product_major', $product_major );

}


add_action( 'add_meta_boxes', 'product_technology' );
function product_technology() {
    add_meta_box(
        'product_technology',
        '工艺',
        'product_technology_meta_box',
        'product',
        'side',
        'low'
    );
}

function product_technology_meta_box($post) {

    // 创建临时隐藏表单，为了安全
    wp_nonce_field( 'product_technology_meta_box', 'product_technology_meta_box_nonce' );
    // 获取之前存储的值
    $value = get_post_meta( $post->ID, '_product_technology', true );

    ?>

    <label for="product_technology"></label>
    <input type="text" id="product_technology" name="product_technology" value="<?php echo esc_attr( $value ); ?>" placeholder="输入作品所使用的工艺" >

    <?php
}

add_action( 'save_post', 'product_technology_save_meta_box' );
function product_technology_save_meta_box($post_id){

    // 安全检查
    // 检查是否发送了一次性隐藏表单内容（判断是否为第三者模拟提交）
    if ( ! isset( $_POST['product_technology_meta_box_nonce'] ) ) {
        return;
    }
    // 判断隐藏表单的值与之前是否相同
    if ( ! wp_verify_nonce( $_POST['product_technology_meta_box_nonce'], 'product_technology_meta_box' ) ) {
        return;
    }
    // 判断该用户是否有权限
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    // 判断 Meta Box 是否为空
    if ( ! isset( $_POST['product_technology'] ) ) {
        return;
    }

    $product_technology = sanitize_text_field( $_POST['product_technology'] );
    update_post_meta( $post_id, '_product_technology', $product_technology );

}


add_action( 'add_meta_boxes', 'product_cost' );
function product_cost() {
    add_meta_box(
        'product_cost',
        '费用',
        'product_cost_meta_box',
        'product',
        'side',
        'low'
    );
}

function product_cost_meta_box($post) {

    // 创建临时隐藏表单，为了安全
    wp_nonce_field( 'product_cost_meta_box', 'product_cost_meta_box_nonce' );
    // 获取之前存储的值
    $value = get_post_meta( $post->ID, '_product_cost', true );

    ?>

    <label for="product_cost"></label>
    <input type="text" id="product_cost" name="product_cost" value="<?php echo esc_attr( $value ); ?>" placeholder="输入作品的制作费用" >

    <?php
}

add_action( 'save_post', 'product_cost_save_meta_box' );
function product_cost_save_meta_box($post_id){

    // 安全检查
    // 检查是否发送了一次性隐藏表单内容（判断是否为第三者模拟提交）
    if ( ! isset( $_POST['product_cost_meta_box_nonce'] ) ) {
        return;
    }
    // 判断隐藏表单的值与之前是否相同
    if ( ! wp_verify_nonce( $_POST['product_cost_meta_box_nonce'], 'product_cost_meta_box' ) ) {
        return;
    }
    // 判断该用户是否有权限
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    // 判断 Meta Box 是否为空
    if ( ! isset( $_POST['product_cost'] ) ) {
        return;
    }

    $product_cost = sanitize_text_field( $_POST['product_cost'] );
    update_post_meta( $post_id, '_product_cost', $product_cost );

}


add_action( 'add_meta_boxes', 'product_state' );
function product_state() {
    add_meta_box(
        'product_state',
        '专业阶段',
        'product_state_meta_box',
        'product',
        'side',
        'low'
    );
}

function product_state_meta_box($post) {

    // 创建临时隐藏表单，为了安全
    wp_nonce_field( 'product_state_meta_box', 'product_state_meta_box_nonce' );
    // 获取之前存储的值
    $value = get_post_meta( $post->ID, '_product_state', true );

    ?>

    <label for="product_state"></label>
    <input type="text" id="product_state" name="product_state" value="<?php echo esc_attr( $value ); ?>" placeholder="输入完成作品时的专业阶段" >

    <?php
}

add_action( 'save_post', 'product_state_save_meta_box' );
function product_state_save_meta_box($post_id){

    // 安全检查
    // 检查是否发送了一次性隐藏表单内容（判断是否为第三者模拟提交）
    if ( ! isset( $_POST['product_state_meta_box_nonce'] ) ) {
        return;
    }
    // 判断隐藏表单的值与之前是否相同
    if ( ! wp_verify_nonce( $_POST['product_state_meta_box_nonce'], 'product_state_meta_box' ) ) {
        return;
    }
    // 判断该用户是否有权限
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    // 判断 Meta Box 是否为空
    if ( ! isset( $_POST['product_state'] ) ) {
        return;
    }

    $product_state = sanitize_text_field( $_POST['product_state'] );
    update_post_meta( $post_id, '_product_state', $product_state );

}

add_action( 'add_meta_boxes', 'product_award' );
function product_award() {
    add_meta_box(
        'product_award',
        '荣誉',
        'product_award_meta_box',
        'product',
        'side',
        'low'
    );
}

function product_award_meta_box($post) {

    // 创建临时隐藏表单，为了安全
    wp_nonce_field( 'product_award_meta_box', 'product_award_meta_box_nonce' );
    // 获取之前存储的值
    $value = get_post_meta( $post->ID, '_product_award', true );

    ?>

    <label for="product_award"></label>
    <input type="text" id="product_award" name="product_award" value="<?php echo esc_attr( $value ); ?>" placeholder="输入该作品所获得的荣誉奖项" >

    <?php
}

add_action( 'save_post', 'product_award_save_meta_box' );
function product_award_save_meta_box($post_id){

    // 安全检查
    // 检查是否发送了一次性隐藏表单内容（判断是否为第三者模拟提交）
    if ( ! isset( $_POST['product_award_meta_box_nonce'] ) ) {
        return;
    }
    // 判断隐藏表单的值与之前是否相同
    if ( ! wp_verify_nonce( $_POST['product_award_meta_box_nonce'], 'product_award_meta_box' ) ) {
        return;
    }
    // 判断该用户是否有权限
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    // 判断 Meta Box 是否为空
    if ( ! isset( $_POST['product_award'] ) ) {
        return;
    }

    $product_award = sanitize_text_field( $_POST['product_award'] );
    update_post_meta( $post_id, '_product_award', $product_award );

}

add_action( 'add_meta_boxes', 'product_tutor' );
function product_tutor() {
    add_meta_box(
        'product_tutor',
        '导师',
        'product_tutor_meta_box',
        'product',
        'side',
        'low'
    );
}

function product_tutor_meta_box($post) {

    // 创建临时隐藏表单，为了安全
    wp_nonce_field( 'product_tutor_meta_box', 'product_tutor_meta_box_nonce' );
    // 获取之前存储的值
    $value = get_post_meta( $post->ID, '_product_tutor', true );

    ?>

    <label for="product_tutor"></label>
    <input type="text" id="product_tutor" name="product_tutor" value="<?php echo esc_attr( $value ); ?>" placeholder="输入导师名称" >

    <?php
}

add_action( 'save_post', 'product_tutor_save_meta_box' );
function product_tutor_save_meta_box($post_id){

    // 安全检查
    // 检查是否发送了一次性隐藏表单内容（判断是否为第三者模拟提交）
    if ( ! isset( $_POST['product_tutor_meta_box_nonce'] ) ) {
        return;
    }
    // 判断隐藏表单的值与之前是否相同
    if ( ! wp_verify_nonce( $_POST['product_tutor_meta_box_nonce'], 'product_tutor_meta_box' ) ) {
        return;
    }
    // 判断该用户是否有权限
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    // 判断 Meta Box 是否为空
    if ( ! isset( $_POST['product_tutor'] ) ) {
        return;
    }

    $product_tutor = sanitize_text_field( $_POST['product_tutor'] );
    update_post_meta( $post_id, '_product_tutor', $product_tutor );

}

add_action( 'add_meta_boxes', 'product_partner' );
function product_partner() {
    add_meta_box(
        'product_partner',
        '合作人',
        'product_partner_meta_box',
        'product',
        'side',
        'low'
    );
}

function product_partner_meta_box($post) {

    // 创建临时隐藏表单，为了安全
    wp_nonce_field( 'product_partner_meta_box', 'product_partner_meta_box_nonce' );
    // 获取之前存储的值
    $value = get_post_meta( $post->ID, '_product_partner', true );

    ?>

    <label for="product_partner"></label>
    <input type="text" id="product_partner" name="product_partner" value="<?php echo esc_attr( $value ); ?>" placeholder="输入合作人名称" >

    <?php
}

add_action( 'save_post', 'product_partner_save_meta_box' );
function product_partner_save_meta_box($post_id){

    // 安全检查
    // 检查是否发送了一次性隐藏表单内容（判断是否为第三者模拟提交）
    if ( ! isset( $_POST['product_partner_meta_box_nonce'] ) ) {
        return;
    }
    // 判断隐藏表单的值与之前是否相同
    if ( ! wp_verify_nonce( $_POST['product_partner_meta_box_nonce'], 'product_partner_meta_box' ) ) {
        return;
    }
    // 判断该用户是否有权限
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    // 判断 Meta Box 是否为空
    if ( ! isset( $_POST['product_partner'] ) ) {
        return;
    }

    $product_partner = sanitize_text_field( $_POST['product_partner'] );
    update_post_meta( $post_id, '_product_partner', $product_partner );

}


add_action( 'add_meta_boxes', 'product_software' );
function product_software() {
    add_meta_box(
        'product_software',
        '软件',
        'product_software_meta_box',
        'product',
        'side',
        'low'
    );
}

function product_software_meta_box($post) {

    // 创建临时隐藏表单，为了安全
    wp_nonce_field( 'product_software_meta_box', 'product_software_meta_box_nonce' );
    // 获取之前存储的值
    $value = get_post_meta( $post->ID, '_product_software', true );

    ?>

    <label for="product_software"></label>
    <input type="text" id="product_software" name="product_software" value="<?php echo esc_attr( $value ); ?>" placeholder="输入完成该作品所使用的软件" >

    <?php
}

add_action( 'save_post', 'product_software_save_meta_box' );
function product_software_save_meta_box($post_id){

    // 安全检查
    // 检查是否发送了一次性隐藏表单内容（判断是否为第三者模拟提交）
    if ( ! isset( $_POST['product_software_meta_box_nonce'] ) ) {
        return;
    }
    // 判断隐藏表单的值与之前是否相同
    if ( ! wp_verify_nonce( $_POST['product_software_meta_box_nonce'], 'product_software_meta_box' ) ) {
        return;
    }
    // 判断该用户是否有权限
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    // 判断 Meta Box 是否为空
    if ( ! isset( $_POST['product_software'] ) ) {
        return;
    }

    $product_software = sanitize_text_field( $_POST['product_software'] );
    update_post_meta( $post_id, '_product_software', $product_software );

}

add_action( 'add_meta_boxes', 'product_location' );
function product_location() {
    add_meta_box(
        'product_location',
        '创作地点',
        'product_location_meta_box',
        'product',
        'side',
        'low'
    );
}

function product_location_meta_box($post) {

    // 创建临时隐藏表单，为了安全
    wp_nonce_field( 'product_location_meta_box', 'product_location_meta_box_nonce' );
    // 获取之前存储的值
    $value = get_post_meta( $post->ID, '_product_location', true );

    ?>

    <label for="product_location"></label>
    <input type="text" id="product_location" name="product_location" value="<?php echo esc_attr( $value ); ?>" placeholder="输入该作品的创作地点" >

    <?php
}

add_action( 'save_post', 'product_location_save_meta_box' );
function product_location_save_meta_box($post_id){

    // 安全检查
    // 检查是否发送了一次性隐藏表单内容（判断是否为第三者模拟提交）
    if ( ! isset( $_POST['product_location_meta_box_nonce'] ) ) {
        return;
    }
    // 判断隐藏表单的值与之前是否相同
    if ( ! wp_verify_nonce( $_POST['product_location_meta_box_nonce'], 'product_location_meta_box' ) ) {
        return;
    }
    // 判断该用户是否有权限
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    // 判断 Meta Box 是否为空
    if ( ! isset( $_POST['product_location'] ) ) {
        return;
    }

    $product_location = sanitize_text_field( $_POST['product_location'] );
    update_post_meta( $post_id, '_product_location', $product_location );

}


add_action( 'add_meta_boxes', 'product_time' );
function product_time() {
    add_meta_box(
        'product_time',
        '创作时间',
        'product_time_meta_box',
        'product',
        'side',
        'low'
    );
}

function product_time_meta_box($post) {

    // 创建临时隐藏表单，为了安全
    wp_nonce_field( 'product_time_meta_box', 'product_time_meta_box_nonce' );
    // 获取之前存储的值
    $value = get_post_meta( $post->ID, '_product_time', true );

    ?>

    <label for="product_time"></label>
    <input type="text" id="product_time" name="product_time" value="<?php echo esc_attr( $value ); ?>" placeholder="输入该作品的创作时间" >

    <?php
}

add_action( 'save_post', 'product_time_save_meta_box' );
function product_time_save_meta_box($post_id){

    // 安全检查
    // 检查是否发送了一次性隐藏表单内容（判断是否为第三者模拟提交）
    if ( ! isset( $_POST['product_time_meta_box_nonce'] ) ) {
        return;
    }
    // 判断隐藏表单的值与之前是否相同
    if ( ! wp_verify_nonce( $_POST['product_time_meta_box_nonce'], 'product_time_meta_box' ) ) {
        return;
    }
    // 判断该用户是否有权限
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    // 判断 Meta Box 是否为空
    if ( ! isset( $_POST['product_time'] ) ) {
        return;
    }

    $product_time = sanitize_text_field( $_POST['product_time'] );
    update_post_meta( $post_id, '_product_time', $product_time );

}



add_action( 'add_meta_boxes', 'product_author' );
function product_author() {
    add_meta_box(
        'product_author',
        '作者',
        'product_author_meta_box',
        'product',
        'side',
        'low'
    );
}

function product_author_meta_box($post) {

    // 创建临时隐藏表单，为了安全
    wp_nonce_field( 'product_author_meta_box', 'product_author_meta_box_nonce' );
    // 获取之前存储的值
    $value = get_the_author_meta( 'display_name', $post->post_author );

    $currentUser = wp_get_current_user();

?>

    <label for="product_author"></label>
	<?php if(!empty($currentUser->roles) && in_array('administrator', $currentUser->roles)) : ?>
    <input type="text" id="product_author" name="product_author" value="<?php echo esc_attr( $value ); ?>" placeholder="输入作者名称" >

    <?php else:?>
    <span><?php echo esc_attr( $value ); ?></span>
	<?php endif;
}

add_action( 'save_post', 'product_author_save_meta_box' );
function product_author_save_meta_box($post_id){

    // 安全检查
    // 检查是否发送了一次性隐藏表单内容（判断是否为第三者模拟提交）
    if ( ! isset( $_POST['product_author_meta_box_nonce'] ) ) {
        return;
    }
    // 判断隐藏表单的值与之前是否相同
    if ( ! wp_verify_nonce( $_POST['product_author_meta_box_nonce'], 'product_author_meta_box' ) ) {
        return;
    }
    // 判断该用户是否有权限
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    // 判断 Meta Box 是否为空
    if ( ! isset( $_POST['product_author'] ) ) {
        return;
    }

    $product_author = sanitize_text_field( $_POST['product_author'] );
    update_post_meta( $post_id, '_product_author', $product_author );
}

//添加新角色
add_role('basic_contributor', '精英用户', array(
    'read' => true, // 使用 true 表示包含这个权限
    'edit_posts' => flase,
    'delete_posts' => false, // 使用 false 表示不包含这个权限
));
//remove_role( 'basic_contributor' );