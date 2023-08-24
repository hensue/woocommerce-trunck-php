/**
 * External dependencies
 */
import { createElement } from '@wordpress/element';

export default function HelpIcon( {
	width = 10,
	height = 15,
	...props
}: React.SVGProps< SVGSVGElement > ) {
	return (
		<svg
			{ ...props }
			width={ width }
			height={ height }
			viewBox={ `0 0 ${ width } ${ height }` }
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g id="help">
				<g id="bundle os x cursors">
					<g id="Made with &#240;&#159;&#146;&#149;by Azendoo design team   @azendoo">
						<g id="help_2">
							<path
								id="cursor"
								fillRule="evenodd"
								clipRule="evenodd"
								d="M2.3165 1.9407C2.9225 1.4527 4.0465 1.0657 5.0025 1.0597C6.5165 1.0507 7.3135 1.5157 8.0285 2.2107C8.7165 2.8797 9.0325 3.5627 8.9815 4.6107C8.9405 5.4637 8.7145 5.9587 8.3775 6.4217C8.1795 6.7027 7.8005 7.0627 7.2395 7.4997L6.7065 7.9297C6.3765 8.2497 6.2325 8.3927 6.1065 8.7497C6.0125 9.0157 5.9905 9.2557 5.9855 9.6717H4.0085C4.0055 8.6557 3.9895 8.2967 4.0985 7.8587C4.2055 7.4327 4.6005 7.1247 5.1615 6.6877L5.7295 6.2417C5.9175 6.1017 6.2235 5.8277 6.3375 5.6607C6.5455 5.3747 6.6715 4.9787 6.6885 4.6357C6.7045 4.3127 6.6075 3.9367 6.3445 3.6087C6.0325 3.2187 5.6415 2.9707 4.8795 3.0047C4.2785 3.0317 3.8185 3.3377 3.5375 3.6267C3.2075 3.9667 3.0635 4.5307 3.0395 4.9767H1.0625C1.1245 3.4927 1.4165 2.6647 2.3165 1.9407Z"
								fill="white"
							/>
							<path
								id="cursor_2"
								fillRule="evenodd"
								clipRule="evenodd"
								d="M2.3165 1.9407C2.9225 1.4527 4.0465 1.0657 5.0025 1.0597C6.5165 1.0507 7.3135 1.5157 8.0285 2.2107C8.7165 2.8797 9.0325 3.5627 8.9815 4.6107C8.9405 5.4637 8.7145 5.9587 8.3775 6.4217C8.1795 6.7027 7.8005 7.0627 7.2395 7.4997L6.7065 7.9297C6.3765 8.2497 6.2325 8.3927 6.1065 8.7497C6.0125 9.0157 5.9905 9.2557 5.9855 9.6717H4.0085C4.0055 8.6557 3.9895 8.2967 4.0985 7.8587C4.2055 7.4327 4.6005 7.1247 5.1615 6.6877L5.7295 6.2417C5.9175 6.1017 6.2235 5.8277 6.3375 5.6607C6.5455 5.3747 6.6715 4.9787 6.6885 4.6357C6.7045 4.3127 6.6075 3.9367 6.3445 3.6087C6.0325 3.2187 5.6415 2.9707 4.8795 3.0047C4.2785 3.0317 3.8185 3.3377 3.5375 3.6267C3.2075 3.9667 3.0635 4.5307 3.0395 4.9767H1.0625C1.1245 3.4927 1.4165 2.6647 2.3165 1.9407Z"
								stroke="white"
								strokeWidth="2"
							/>
							<mask
								id="mask0_4951_449651"
								maskUnits="userSpaceOnUse"
								x="-4"
								y="-1"
								width="18"
								height="18"
							>
								<g id="mask 2">
									<path
										id="Vector"
										d="M-4 -1H14V17H-4V-1Z"
										fill="white"
									/>
								</g>
							</mask>
							<g mask="url(#mask0_4951_449651)">
								<path
									id="cursor_3"
									fillRule="evenodd"
									clipRule="evenodd"
									d="M3.75391 10.8628H6.22791V13.2578H3.75391V10.8628Z"
									fill="white"
								/>
								<path
									id="cursor_4"
									fillRule="evenodd"
									clipRule="evenodd"
									d="M3.75391 10.8628H6.22791V13.2578H3.75391V10.8628Z"
									stroke="white"
									strokeWidth="1.5"
								/>
								<path
									id="cursor_5"
									fillRule="evenodd"
									clipRule="evenodd"
									d="M2.515 1.92095C3.212 1.47195 3.857 1.12695 4.941 1.12695C6.558 1.12695 6.924 1.36895 7.753 2.03095C8.503 2.62995 8.96 3.40695 8.96 4.51095C8.96 5.18795 8.596 5.91895 8.258 6.38195C8.061 6.66295 7.799 6.94195 7.238 7.37995L6.626 7.84995C6.326 8.08395 6.028 8.43795 5.929 8.74995C5.867 8.94795 5.871 9.37295 5.867 9.78895H4.007C4.038 8.90895 4.041 8.18395 4.176 7.84795C4.311 7.51195 4.659 7.12495 5.22 6.68795L5.767 6.24195C5.954 6.10195 6.242 5.88795 6.356 5.72095C6.564 5.43495 6.745 5.01995 6.745 4.67595C6.745 4.27995 6.767 3.99995 6.536 3.67395C6.266 3.29595 6.02 2.87995 4.858 2.85995C3.953 2.84395 3.567 3.30695 3.316 3.70695C3.064 4.10895 2.978 4.56495 2.978 4.99695H1C1.063 3.51295 1.541 2.54095 2.515 1.92095Z"
									fill="black"
								/>
								<path
									id="cursor_6"
									fillRule="evenodd"
									clipRule="evenodd"
									d="M4.01172 11.0161H5.99072V13.0001H4.01172V11.0161Z"
									fill="black"
								/>
							</g>
						</g>
					</g>
				</g>
			</g>
			<defs>
				<clipPath id="clip0_4951_449651">
					<rect width="10" height="15" fill="white" />
				</clipPath>
			</defs>
		</svg>
	);
}
