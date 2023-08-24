/**
 * External dependencies
 */
import { chevronDown } from '@wordpress/icons';
import classNames from 'classnames';
import { createElement, useState } from '@wordpress/element';
import { useInstanceId } from '@wordpress/compose';
import { BaseControl, TextControl } from '@wordpress/components';

/**
 * Internal dependencies
 */
import { useLinkedTree } from '../experimental-tree-control/hooks/use-linked-tree';
import { Item, TreeControlProps } from '../experimental-tree-control/types';
import { SelectedItems } from '../experimental-select-control/selected-items';
import { ComboBox } from '../experimental-select-control/combo-box';
import { SuffixIcon } from '../experimental-select-control/suffix-icon';
import { SelectTreeMenu } from './select-tree-menu';

interface SelectTreeProps extends TreeControlProps {
	id: string;
	selected?: Item | Item[];
	treeRef?: React.ForwardedRef< HTMLOListElement >;
	suffix?: JSX.Element | null;
	isLoading?: boolean;
	label: string | JSX.Element;
	onInputChange?: ( value: string | undefined ) => void;
}

export const SelectTree = function SelectTree( {
	items,
	treeRef: ref,
	suffix = <SuffixIcon icon={ chevronDown } />,
	placeholder,
	isLoading,
	onInputChange,
	shouldShowCreateButton,
	...props
}: SelectTreeProps ) {
	const linkedTree = useLinkedTree( items );
	const selectTreeInstanceId = useInstanceId(
		SelectTree,
		'woocommerce-experimental-select-tree-control__dropdown'
	);
	const menuInstanceId = useInstanceId(
		SelectTree,
		'woocommerce-select-tree-control__menu'
	);
	const isEventOutside = ( event: React.FocusEvent ) => {
		return ! document
			.querySelector( '.' + selectTreeInstanceId )
			?.contains( event.relatedTarget );
	};

	const recalculateInputValue = () => {
		if ( onInputChange ) {
			if ( ! props.multiple && props.selected ) {
				onInputChange( ( props.selected as Item ).label );
			} else {
				onInputChange( '' );
			}
		}
	};

	const focusOnInput = () => {
		(
			document.querySelector( `#${ props.id }-input` ) as HTMLInputElement
		 )?.focus();
	};

	const [ isFocused, setIsFocused ] = useState( false );
	const [ isOpen, setIsOpen ] = useState( false );
	const isReadOnly = ! isOpen && ! isFocused;

	const inputProps: React.InputHTMLAttributes< HTMLInputElement > = {
		className: 'woocommerce-experimental-select-control__input',
		id: `${ props.id }-input`,
		'aria-autocomplete': 'list',
		'aria-controls': `${ props.id }-menu`,
		autoComplete: 'off',
		onFocus: () => {
			if ( ! isOpen ) {
				setIsOpen( true );
			}
			setIsFocused( true );
		},
		onBlur: ( event ) => {
			if ( isOpen && isEventOutside( event ) ) {
				setIsOpen( false );
				recalculateInputValue();
			}
			setIsFocused( false );
		},
		onKeyDown: ( event ) => {
			setIsOpen( true );
			if ( event.key === 'ArrowDown' ) {
				event.preventDefault();
				// focus on the first element from the Popover
				(
					document.querySelector(
						`.${ menuInstanceId } input, .${ menuInstanceId } button`
					) as HTMLInputElement | HTMLButtonElement
				 )?.focus();
			}
			if ( event.key === 'Tab' ) {
				setIsOpen( false );
				recalculateInputValue();
			}
		},
		onChange: ( event ) =>
			onInputChange && onInputChange( event.target.value ),
		placeholder,
	};

	return (
		<div
			className={ `woocommerce-experimental-select-tree-control__dropdown ${ selectTreeInstanceId }` }
			tabIndex={ -1 }
		>
			<div
				className={ classNames(
					'woocommerce-experimental-select-control',
					{
						'is-read-only': isReadOnly,
						'is-focused': isFocused,
						'is-multiple': props.multiple,
						'has-selected-items':
							Array.isArray( props.selected ) &&
							props.selected.length,
					}
				) }
			>
				<BaseControl label={ props.label } id={ `${ props.id }-input` }>
					{ props.multiple ? (
						<ComboBox
							comboBoxProps={ {
								className:
									'woocommerce-experimental-select-control__combo-box-wrapper',
								role: 'combobox',
								'aria-expanded': isOpen,
								'aria-haspopup': 'tree',
								'aria-owns': `${ props.id }-menu`,
							} }
							inputProps={ inputProps }
							suffix={ suffix }
						>
							<SelectedItems
								isReadOnly={ isReadOnly }
								items={ ( props.selected as Item[] ) || [] }
								getItemLabel={ ( item ) => item?.label || '' }
								getItemValue={ ( item ) => item?.value || '' }
								onRemove={ ( item ) => {
									if (
										! Array.isArray( item ) &&
										props.onRemove
									) {
										props.onRemove( item );
									}
								} }
								getSelectedItemProps={ () => ( {} ) }
							/>
						</ComboBox>
					) : (
						<TextControl
							{ ...inputProps }
							value={ props.createValue || '' }
							onChange={ ( value ) => {
								if ( onInputChange ) onInputChange( value );
								const item = items.find(
									( i ) => i.label === value
								);
								if ( props.onSelect && item ) {
									props.onSelect( item );
								}
								if ( ! value && props.onRemove ) {
									props.onRemove( props.selected as Item );
								}
							} }
						/>
					) }
				</BaseControl>
			</div>
			<SelectTreeMenu
				{ ...props }
				onSelect={ ( item ) => {
					if ( ! props.multiple && onInputChange ) {
						onInputChange( ( item as Item ).label );
						setIsOpen( false );
						setIsFocused( false );
						focusOnInput();
					}
					if ( props.onSelect ) {
						props.onSelect( item );
					}
				} }
				id={ `${ props.id }-menu` }
				className={ menuInstanceId.toString() }
				ref={ ref }
				isEventOutside={ isEventOutside }
				isOpen={ isOpen }
				items={ linkedTree }
				shouldShowCreateButton={ shouldShowCreateButton }
				onClose={ () => {
					setIsOpen( false );
				} }
			/>
		</div>
	);
};
