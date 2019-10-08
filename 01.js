var doc = app.activeDocument;
//Clear the find/change preferences.
app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;
//Set the find options.
app.findChangeTextOptions.caseSensitive = false;
app.findChangeTextOptions.includeFootnotes = false;
app.findChangeTextOptions.includeHiddenLayers = false;
app.findChangeTextOptions.includeLockedLayersForFind = false;
app.findChangeTextOptions.includeLockedStoriesForFind = false;
app.findChangeTextOptions.includeMasterPages = false;
app.findChangeTextOptions.wholeWord = false;
//Search the document for the 24 point text and change it to 10 point text.

var myTYT = doc.paragraphStyles.item("TYT_1");
var myRED = doc.characterStyles.item("RED");

app.findTextPreferences.appliedParagraphStyle = myTYT;

var finds = doc.findText()
var wszystkieStrony = [];
var digMax = 70;
//alert("finds.length: " + finds.length);
for (var i = 0; i < finds.length; i++) {
	
	var singleLEN = finds[i].contents.length;
	//alert("finds[i].contents.length " + finds[i].contents.length);
	if(singleLEN > digMax) {
		//alert("single > od digimax: " + i);

		var single1 = finds[i].contents;
		//var curDigMax = digMax;
		
		var str = single1;
		var n = str.lastIndexOf(" ", digMax);
		var cutString = str.substring(0, n);


		app.findTextPreferences.appliedParagraphStyle = myTYT;
		app.findTextPreferences.findWhat = cutString;


		app.changeTextPreferences.appliedCharacterStyle = myRED;
		doc.changeText();
		





		//app.changeTextPreferences.appliedCharacterStyle = myRED;
		//czek.appliedCharacterStyle = myRED;
		//var czek = finds[i].characters.item[digMax];



		wszystkieStrony.push(finds[i].parentTextFrames[0].parent.name + "D");




	} else {

		
		var numBezD = parseInt(finds[i].parentTextFrames[0].parent.name);


		wszystkieStrony.push(numBezD);


		var single1 = finds[i].contents;

		app.findTextPreferences.appliedParagraphStyle = myTYT;
		app.findTextPreferences.findWhat = single1;


		app.changeTextPreferences.appliedCharacterStyle = myRED;
		doc.changeText();



	}


	

} //END for

//var PagNum = finds[0].parentTextFrames[0].parent.name;

// dodaje num koniec na 17ej stronie
wszystkieStrony.push(360);


alert("mam " + finds.length);
alert("na stronach: " + wszystkieStrony);

// what pages to apply???
//1,3d,5d,11,15d,17     czyli 5
// 4-10    16-16 
//doc.pages.item(4).appliedMaster = doc.masterSpreads.item("B-Master");

var pagesD = [];
var masterRange = [];
function liczSpread(start, stop){
	for(var m = start; m<= stop;m++){
		masterRange.push(m);
	}
}

for (var i = 0; i < wszystkieStrony.length; i++){
	if(typeof wszystkieStrony[i] == "string") {
		pagesD.push(wszystkieStrony[i]);
		//alert("znaleziono D na pozycji: "+ i)

		//---------------------------- szukaj ciagu string number i jumpnij na i = found
			
			for (var j = 1; j <= wszystkieStrony.length -i ; j++) {
				if ( typeof wszystkieStrony[i+j] == "number"    ) {
						//alert("jestem na poz: "+i+ "  mam NUMBER " + j + " dalej ");
						
						var FROM1 = wszystkieStrony[i]; 
						var FROM2 = FROM1.slice(0, -1);
						var FROM3 = parseInt(FROM2) + 1;

						var TOOO3 = wszystkieStrony[i+j] -1;
						alert("FROM :" + FROM3 + "TOOO: " + TOOO3 );

						liczSpread(FROM3, TOOO3);

						//jump;
						i = i+j  ;
						
						//alert("robie jump na pozycje " + i );
						break;
				} else {
					//alert("szukam dalej NUM o " +j + "dalej");
				}
		

			}


		//----------------------------

		//alert("not a number" + "  enumeracja " + i);
		
	} else {
		//alert(" number" + "  enumeracja " + i);
	}
 }//end for


//alert("z D " + pagesD);
alert("range: " + masterRange)


// GENERATE RANGE 


//apply master
for(var z = 0; z <= masterRange.length -1 ;z++){
	doc.pages.item(masterRange[z]-1).appliedMaster = doc.masterSpreads.item("B-Master");
	//alert("nadaje master na strone: " + z);
}


//myDocument.changeText();


//Clear the find/change preferences after the search.
app.findTextPreferences = NothingEnum.nothing;
app.changeTextPreferences = NothingEnum.nothing;