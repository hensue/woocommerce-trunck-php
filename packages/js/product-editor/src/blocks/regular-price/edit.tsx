/**
 * External dependencies
 */
import classNames from 'classnames';
import { Link } from '@woocommerce/components';
import { Product } from '@woocommerce/data';
import { getNewPath } from '@woocommerce/navigation';
import { recordEvent } from '@woocommerce/tracks';
import { useBlockProps } from '@wordpress/block-editor';
import { BlockEditProps } from '@wordpress/blocks';
import { useInstanceId } from '@wordpress/compose';
import { useEntityProp } from '@wordpress/core-data';
import { createElement, createInterpolateElement } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import {
	BaseControl,
	// @ts-expect-error `__experimentalInputControl` does exist.
	__experimentalInputControl as InputControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { useValidation } from '../../contexts/validation-context';
import { useCurrencyInputProps } from '../../hooks/use-currency-input-props';
import { SalePriceBlockAttributes } from './types';

export function Edit( {
	attributes,
	clientId,
}: BlockEditProps< SalePriceBlockAttributes > ) {
	const blockProps = useBlockProps();
	const { label, help } = attributes;
	const [ regularPrice, setRegularPrice ] = useEntityProp< string >(
		'postType',
		'product',
		'regular_price'
	);
	const [ salePrice ] = useEntityProp< string >(
		'postType',
		'product',
		'sale_price'
	);
	const inputProps = useCurrencyInputProps( {
		value: regularPrice,
		onChange: setRegularPrice,
	} );

	const interpolatedHelp = help
		? createInterpolateElement( help, {
				PricingTab: (
					<Link
						href={ getNewPath( { tab: 'pricing' } ) }
						onClick={ () => {
							recordEvent( 'product_pricing_help_click' );
						} }
					/>
				),
		  } )
		: null;

	const regularPriceId = useInstanceId(
		BaseControl,
		'wp-block-woocommerce-product-regular-price-field'
	) as string;

	const {
		ref: regularPriceRef,
		error: regularPriceValidationError,
		validate: validateRegularPrice,
	} = useValidation< Product >(
		`regular_price-${ clientId }`,
		async function regularPriceValidator() {
			const listPrice = Number.parseFloat( regularPrice );
			if ( listPrice ) {
				if ( listPrice < 0 ) {
					return __(
						'List price must be greater than or equals to zero.',
						'woocommerce'
					);
				}
				if (
					salePrice &&
					listPrice <= Number.parseFloat( salePrice )
				) {
					return __(
						'List price must be greater than the sale price.',
						'woocommerce'
					);
				}
			}
		},
		[ regularPrice, salePrice ]
	);

	return (
		<div { ...blockProps }>
			<BaseControl
				id={ regularPriceId }
				help={
					regularPriceValidationError
						? regularPriceValidationError
						: interpolatedHelp
				}
				className={ classNames( {
					'has-error': regularPriceValidationError,
				} ) }
			>
				<InputControl
					{ ...inputProps }
					id={ regularPriceId }
					name={ 'regular_price' }
					ref={ regularPriceRef }
					label={ label }
					onBlur={ validateRegularPrice }
				/>
			</BaseControl>
		</div>
	);
}
