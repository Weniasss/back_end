import React from 'react'
import { CardItem } from '../../molecules/ExampleProjectCard/CardItem'

export const ExampleProjectsSection = () => {
  return (
	<>
		<span className="grid grid-cols-3 px-10">

			<CardItem
				title="example project"
				text ="example technology"
				description="example description"
				id="example id"
			/>
			<CardItem
				title="example project"
				text ="example technology"
				description="example description"
				id="example id"
			/>
			<CardItem
				title="example project"
				text ="example technology"
				description="example description"
				id="example id"
			/>
		</span>
	</>
  )
}
