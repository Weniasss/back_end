import React from "react";
import { ServiceContent } from "../ServiceContent";

const ServiceGroupItems = (props) => {
  return (
	//<ServiceIcon icon="faHome" />
	<div class="grid md:grid-cols-3">
		<ServiceContent class={props.style} icon="faAnglesRight"/>

		<ServiceContent class={props.style} icon="faClock"/>

		<ServiceContent class={props.style2} icon="faHome"/>
 	</div>
  )
}

export default ServiceGroupItems
