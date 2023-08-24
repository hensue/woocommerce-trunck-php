<?php
/**
 * Bootstrap class file.
 *
 * @package  WooCommerceDocs
 */

namespace WooCommerceDocs\App;

use WooCommerceDocs\Data;
use WooCommerceDocs\API;

/**
 * A class to set up the plugin.
 */
class Bootstrap {

	/**
	 * Bootstrap the plugin.
	 */
	public static function bootstrap() {
		add_action( 'admin_menu', array( __CLASS__, 'add_admin_menu' ) );
		add_action( 'admin_enqueue_scripts', array( __CLASS__, 'register_scripts' ) );
		add_action( 'rest_api_init', array( __CLASS__, 'register_api_endpoints' ) );
		add_action( 'init', array( __CLASS__, 'setup_stores' ) );

		// Register the manifest job.
		new \WooCommerceDocs\Job\ManifestJob();
	}

	/**
	 * Register client-side scripts.
	 */
	public static function register_scripts() {
		$script_path       = 'build/wc-docs.js';
		$script_asset_path = WOOCOMMERCE_DOCS_PLUGIN_PATH . '/build/wc-docs.asset.php';
		$script_asset      = file_exists( $script_asset_path )
		? require $script_asset_path
		: array(
			'dependencies' => array(),
			'version'      => filemtime( $script_path ),
		);
		$script_url        = WOOCOMMERCE_DOCS_ROOT_URL . $script_path;

		wp_register_script(
			'wc_docs',
			$script_url,
			$script_asset['dependencies'],
			$script_asset['version'],
			true
		);
		wp_enqueue_script( 'wc_docs' );
		wp_enqueue_style( 'wp-components' );
	}

	/**
	 * Define the add_admin_menu function
	 */
	public static function add_admin_menu() {
		// Add a top-level menu item to the admin menu.
		add_menu_page(
			'WooCommerce Docs',
			'WooCommerce Docs',
			'manage_options',
			'woocommerce-docs',
			array( __CLASS__, 'render_admin_page' ),
			'dashicons-media-document',
			6
		);
	}

	/**
	 * Render admin page
	 */
	public static function render_admin_page() {
		// Include the admin page template.
		include_once WOOCOMMERCE_DOCS_PLUGIN_PATH . '/src/views/admin.php';
	}

	/**
	 * Register API endpoints
	 */
	public static function register_api_endpoints() {
		API\ManifestAPI::register_routes();
		API\JobAPI::register_routes();
	}

	/**
	 * Perform any setup for data stores
	 */
	public static function setup_stores() {
		Data\DocsStore::setup();
	}
}

