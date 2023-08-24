/**
 * External dependencies
 */
import { useBlockProps } from '@wordpress/block-editor';
import { BlockEditProps } from '@wordpress/blocks';
import { useInstanceId } from '@wordpress/compose';
import { useEntityProp } from '@wordpress/core-data';
import { createElement, useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	BaseControl,
	CheckboxControl,
	// @ts-expect-error `__experimentalInputControl` does exist.
	__experimentalInputControl as InputControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */

import { RequirePasswordBlockAttributes } from './types';

export function Edit( {
	attributes,
}: BlockEditProps< RequirePasswordBlockAttributes > ) {
	const blockProps = useBlockProps();
	const { label } = attributes;

	const [ postPassword, setPostPassword ] = useEntityProp< string >(
		'postType',
		'product',
		'post_password'
	);

	const [ checked, setChecked ] = useState( Boolean( postPassword ) );
	const postPasswordId = useInstanceId(
		BaseControl,
		'post_password'
	) as string;

	return (
		<div { ...blockProps }>
			<CheckboxControl
				label={ label }
				checked={ checked }
				className="wp-block-woocommerce-product-password-fields__field"
				onChange={ ( selected ) => {
					setChecked( selected );
					if ( ! selected ) {
						setPostPassword( '' );
					}
				} }
			/>
			{ checked && (
				<BaseControl
					id={ postPasswordId }
					label={ __( 'Password', 'woocommerce' ) }
				>
					<InputControl
						id={ postPasswordId }
						value={ postPassword }
						onChange={ setPostPassword }
					/>
				</BaseControl>
			) }
		</div>
	);
}
