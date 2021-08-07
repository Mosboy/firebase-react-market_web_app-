export function formatPrice(cents){
	return(cents/100).toLocaleString("en-US",{
		style:"currency",
		currency:"USD"
	})
}

export function slugify(text){
	return text
	   .toString()
	   .toLowerCase()
	   .replace(/\s+/g,"-")
	   .replace(/[^\w-]+/g,"")
	   .replace(/--+/,"")
	   .replace(/^-+/,"")
	   .replace(/-+$/,"")
}

export function rando(arr){
	return arr[Math.floor(Math.random()*arr.length)]
}

export function getFunName(){
	const adjectives=[
	"adorable",
	"beautiful",
	"clean",
	"drab",
	"elegant",
	"fancy",
	"glamorous",
	"handsome",
	"long",
	"magnificient",
	"old-fashioned",
	"plain",
	"quaint",
	"sparking",
	"ugliest",
	"unsightly",
	"angry",
	"bewildered",
	"clumsy",
	"defeated",
	"embarrased",
	"worried"
	];
	const nouns=[
      "women",
      "men",
      "children",
      "teeth",
      "feeth",
      "people",
      "leaves",
      "mice",
      "geece",
      "halves",
      "knives",
      "lives",
      "elves",
      "loaves",
      "potatoes",
      "tomatoes",
      "fungi",
      "foci",
      "nuclei"
	]
	return `${rando(adjectives)}-${rando(adjectives)}-${rando(nouns)}`
}