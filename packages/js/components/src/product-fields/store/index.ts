/**
 * External dependencies
 */
import { createReduxStore, register } from '@wordpress/data';

/**
 * Internal dependencies
 */
import reducer from './reducer';
import * as selectors from './selectors';
import * as actions from './actions';
import { STORE_NAME } from './constants';

export const store = createReduxStore( STORE_NAME, {
	// @ts-expect-error reducer has correct format.
	reducer,
	selectors,
	actions,
} );

register( store );
