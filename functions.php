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
add_role('special_invitation', '特邀用户', array(
    'read' => true, // 使用 true 表示包含这个权限
    'edit_posts' => true,
    'delete_posts' => false, // 使用 false 表示不包含这个权限
));
//remove_role( 'special_invitation' );




//自定义文章类型
function my_custom_post_product() {
  $labels = array(
    'name'               => _x( '作品', 'post type 名称' ),
    'singular_name'      => _x( '作品', 'post type 单个 item 时的名称，因为英文有复数' ),
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
	  'show_ui' => true,
    'labels' => $labels,
    'hierarchical' => true,
  );
  register_taxonomy( 'product_category', 'product', $args );
}
add_action( 'init', 'my_taxonomies_product', 0 );





//引进自定义js脚本
function my_scripts_method() {
    wp_enqueue_script('getUserByRole-aa', get_template_directory_uri().'/js/getUserByRole.js', array('jquery'));           
}
add_action('admin_enqueue_scripts', 'my_scripts_method');

//getUser_action
function getUserByRole() {
    $Role = isset( $_POST['role'] ) ? $_POST['role'] : null;
    if(strlen($Role) > 0){
        $args = array('role' => $Role, );
        $blogusers = get_users($args);
?> 
		<option value=''>请选择用户</option>
        <?php foreach ($blogusers as $user){?>
            <option value=<?php echo $user->ID; ?>><?php echo $user->display_name; ?></option>
        <?php 
        }
    }
    die();
}

add_action('wp_ajax_getUser_action', 'getUserByRole');
add_action( 'wp_ajax_nopriv_getUser_action', 'getUserByRole' );


/*****************/
/*添加修改作者表单*/
/*****************/
add_action( 'add_meta_boxes', 'product_author' );
function product_author() {
    add_meta_box(
        'product_author',
        '作者',
        'product_author_meta_box',
        'product',
        'side',
        'high'
    );
}

function product_author_meta_box($post) {

    // 创建临时隐藏表单，为了安全
    wp_nonce_field( 'product_author_meta_box', 'product_author_meta_box_nonce' );
    // 获取之前存储的值
    $value = get_the_author_meta( 'display_name', $post->post_author );
    
    //获取当前用户,用于检验权限
    $currentUser = wp_get_current_user();
    
    //获取某一角色的用户
    $args = array('role' => 'special_invitation', );
	$blogusers = get_users($args);
    
?>

	<?php if(!empty($currentUser->roles) && in_array('administrator', $currentUser->roles)) : ?>
    <div style="text-align:center;font-size:16px"><?php echo esc_attr( $value ); ?></div>
        
	<label for="product_author">修改/设置为：</label>
	<div style="margin:7px 0">
		
		<?php
			$roles_obj = new WP_Roles();
			$roles_names_array = $roles_obj->get_names();
			//！！！！！！！！！引入getUserByRole.js后，"#selectRole"的value一旦修改就会触发ajax
		?>
		<select id="selectRole" name="role">
			<option value=''>选择用户角色</option>
		<?php foreach ($roles_names_array as $role_name => $display_name) {?>
				<option value=<?php echo $role_name ?>><?php echo $display_name; ?></option>
				<?php  ?>
		<?php } ?>
		</select>
		<select id="selectUser" name="product_author">
			<option value=''>请选择用户</option>
		</select>
		<div id="spinner_selectUser" style="background:url(images/spinner.gif) no-repeat;width:20px;height:20px;margin:5px 0;float:right;display:none"></div>
	</div>
    
    <?php else:?>
    <span><?php echo esc_attr( $value ); ?></span>
	<?php endif;
}

//修改文章作者
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
    if ( ! isset( $_POST['product_author']) || $_POST['product_author'] == '') {
        return;
    }
	//ini_set('xdebug.max_nesting_level', 100);
    $product_author = sanitize_text_field( $_POST['product_author']);
	
	if ( ! wp_is_post_revision( $post_id ) ){
	
		// unhook this function so it doesn't loop infinitely
		remove_action('save_post', 'product_author_save_meta_box');
	
		// update the post, which calls save_post again
		//有待排查bug(真的有吗?)
		$my_post = array();
		$my_post['ID'] = $post_id;
		global $post;
		$my_post['post_author'] = $product_author;
		wp_update_post( $my_post );

		// re-hook this function
		add_action('save_post', 'product_author_save_meta_box');
	}
}


// 添加作品信息表单
add_action( 'add_meta_boxes', 'product_info' );
function product_info() {
    add_meta_box(
        'product_info',
        '作品信息',
        'product_info_meta_box',
        'product',
        'side',
        'high'
    );
}

function product_info_meta_box($post) {

    // 创建临时隐藏表单，为了安全
    wp_nonce_field( 'product_info_meta_box', 'product_info_meta_box_nonce' );
    // 获取之前存储的值
    //$value = get_the_author_meta( 'display_name', $post->post_author );
	$valueAttribute = get_post_meta( $post->ID, '_product_attribute', true );
	$valueDate = get_post_meta( $post->ID, '_product_creation_date', true );
	$valueMajor = get_post_meta( $post->ID, '_product_major', true );
	$valueSubMajor = get_post_meta( $post->ID, '_product_subMajor', true );
	$valueMaterial = get_post_meta( $post->ID, '_product_material', true );
	$materials = ["纸本水墨","纸本彩墨","绢本彩墨","布面油彩","木板油彩","布面丙烯","丝网版画","黑白木刻","雕塑","陶","瓷","DV","装置","综合媒材","纸本","铸铜"]
?>
	<style>
		.product_info_box{
			margin:8px 0;
		}
		.product_info_box label{
			font-weight : bold;
		}
	</style>
	
    <div class="product_info_box">
	<label for="product_attribute">作品属性:</label>
	<select id="product_attribute" name="product_attribute">
		<option value='homework' <?php echo $valueAttribute == 'homework'?  "selected" : ''?>>作业</option>
		<option value='graduation_project' <?php echo $valueAttribute == 'graduation_project'?  "selected" : ''?>>毕业设计</option>
		<option value='others' <?php echo $valueAttribute == 'others'?  "selected" : ''?>>其他</option>
	</select>
	</div>
	
	<div class="product_info_box">
	<label for="product_creation_date">创作年份:</label>
	<select id="product_creation_date" name="product_creation_date">
		<?php for ($i = 2010; $i <= date("Y"); $i++):?>
			<option value=<?php echo $i ?> <?php echo $valueDate == $i?  "selected" : ''?>><?php echo $i ?></option>
		<?php endfor; ?>
	</select>
	</div>
	
	<div class="product_info_box">
	<label for="product_major">专业:</label>
	<select id="product_major" name="product_major">
		<?php  
			$majorJson = get_template_directory_uri()."/major.json";
			$majorJson_string = file_get_contents($majorJson);
			$majors=json_decode($majorJson_string,true);
			
			foreach($majors as $major => $subMajor): ?>
				<option value=<?php echo $major; ?> <?php echo $valueMajor == $major?  "selected" : ''?>><?php echo $major; ?></option>
			<?php endforeach; ?>		
	</select>
	
	<select id="product_subMajor" name="product_subMajor" style="display:<?php echo $valueSubMajor != "" ? "inline" : "none" ?>;margin-left:34px">
	<?php if ($valueMajor != ""): ?>
		<?php for($i = 0; $i < count($majors[$valueMajor]) ;$i++): ?>
			<option value=<?php echo $majors[$valueMajor][$i]; ?> <?php echo $majors[$valueMajor][$i] == $valueSubMajor?  "selected" : ''?>><?php echo $majors[$valueMajor][$i]; ?></option>
		<?php endfor; ?>
	<?php endif; ?>
	</select>
	<div id="spinner_major" style="background:url(images/spinner.gif) no-repeat;width:20px;height:20px;margin:5px 0;float:right;display:none"></div>

	</div>
	
	<div class="product_info_box">
	<label for="product_material">材料:</label>
	<select id="product_material" name="product_material">
		<?php for($i = 0; $i < count($materials); $i++): ?>
		<option value=<?php echo $materials[$i] ?> <?php echo $valueMaterial == $materials[$i]?  "selected" : ''?>><?php echo $materials[$i] ?></option>
		<?php endfor; ?>
	</select>
	</div>
	
<?php 
}

add_action( 'save_post', 'product_info_save_meta_box' );
function product_info_save_meta_box($post_id){

    // 安全检查
    // 检查是否发送了一次性隐藏表单内容（判断是否为第三者模拟提交）
    if ( ! isset( $_POST['product_info_meta_box_nonce'] ) ) {
        return;
    }
    // 判断隐藏表单的值与之前是否相同
    if ( ! wp_verify_nonce( $_POST['product_info_meta_box_nonce'], 'product_info_meta_box' ) ) {
        return;
    }
    // 判断该用户是否有权限
    if ( ! current_user_can( 'edit_post', $post_id ) ) {
        return;
    }

    // 判断 product_attribute 是否为空
    if ( ! isset( $_POST['product_attribute'] ) ) {
        return;
    }

    $product_attribute = sanitize_text_field( $_POST['product_attribute'] );
    update_post_meta( $post_id, '_product_attribute', $product_attribute );
	
	
	// 判断 product_creation_date 是否为空
    if ( ! isset( $_POST['product_creation_date'] ) ) {
        return;
    }

    $product_creation_date = sanitize_text_field( $_POST['product_creation_date'] );
    update_post_meta( $post_id, '_product_creation_date', $product_creation_date );
	
	
	// 判断 product_major 是否为空
    if ( ! isset( $_POST['product_major'] ) ) {
        return;
    }

    $product_major = sanitize_text_field( $_POST['product_major'] );
    update_post_meta( $post_id, '_product_major', $product_major );
	
	
	// 判断 product_subMajor 是否为空
    if ( ! isset( $_POST['product_subMajor'] ) ) {
        return;
    }

    $product_subMajor = sanitize_text_field( $_POST['product_subMajor'] );
    update_post_meta( $post_id, '_product_subMajor', $product_subMajor );
	
	
	// 判断 product_material 是否为空
    if ( ! isset( $_POST['product_material'] ) ) {
        return;
    }

    $product_material = sanitize_text_field( $_POST['product_material'] );
    update_post_meta( $post_id, '_product_material', $product_material );

}

//getSubMajor_action
function getSubMajor() {
    $major = isset( $_POST['major'] ) ? $_POST['major'] : null;
    if(strlen($major) > 0){
		if(!$majors){
			$majorJson = get_template_directory_uri()."/major.json";
			$majorJson_string = file_get_contents($majorJson);
			$majors=json_decode($majorJson_string,true);
		}
		$count_subMajor = count($majors[$major]);
?>
		<?php for($i = 0; $i < $count_subMajor; $i++): ?>
			<option value=<?php echo $majors[$major][$i]; ?>><?php echo $majors[$major][$i]; ?></option>
		<?php endfor; ?>
	<?php 
	}
    die();
}

add_action('wp_ajax_getSubMajor_action', 'getSubMajor');
add_action( 'wp_ajax_nopriv_getSubMajor_action', 'getSubMajor' );





