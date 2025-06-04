import { onMount } from "svelte";

export let title = "This is your title";
export let titleColor = "blue";

/** fill this variable will render this string as HTML content inside */
export let htmlContent = "<div><p>this content is fed as string and rendered as <b>HTML</b> into this <i>element</i></p></div>";

/** --start-- example of using dynamic binded datasource with custom structure */
export let datasource;
datasourceschema = [{ datasource: { id:"", title:"", subtitle:"", description:"", src:"" } }];
let parsedListItems;

function setDefault() {
	datasource = [{"id":1,"title":"Title 1","subtitle":"Sub Title 1","description":"Content text apears here"},{"id":2,"title":"Title 2","subtitle":"Sub Title 2","description":"Content text apears here"}];
	parsedListItems = datasource;
}

$: {
	if (datasource && typeof datasource === "string") {
		try {
			parsedListItems = JSON.parse(datasource);
			if (!Array.isArray(parsedListItems)) {
				alert("Parsed String is not an array")
				throw new Error("Not object");
			}
		} catch (e) {
			setDefault();
		}
	} else if(datasource && Array.isArray(datasource)) {
		parsedListItems = datasource;
	}
}
/** --end-- example of using dynamic binded datasource with custom structure */

onMount(() => {
	if(!datasource)
		setDefault()
});