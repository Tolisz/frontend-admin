import React from 'react'

export const MainPage = ( { isInquiries} ) => {

	

	return (
		<div>
			MainPage

			{ isInquiries 
				? 
				<div> Przypadek 1 </div>
				: 
				<div> Przypadek 2 </div>
			}	
		</div>
	)
}
