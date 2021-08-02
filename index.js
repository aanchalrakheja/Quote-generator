
var quoteContainer=document.getElementById("quote-container");
var quoteText=document.getElementById("quote");
var quoteAuthor=document.getElementById("quote-author");
var twitter=document.getElementById("twitter");
var newQuote=document.getElementById("new-quote");
var loader=document.getElementById("loader");

// asynchronous function to get random quotes using an api
 async function getQuote(){
    load();
    const apiurl="https://type.fit/api/quotes/?method=getQuote&lang=en&format=json";
    try{
        const response= await fetch(apiurl);
        const data=await response.json();
        var number=Math.trunc(Math.random()*data.length);
        //condition: if the author of the quote is not mentioned replace it with unknown
        if(data[number].author===null)
        {
            quoteAuthor.innerText="Unknown"; 
        }
        else{
            quoteAuthor.innerText=data[number].author;
        }
        //manage the length of the quote and hence reduce the font size.
        if(data[number].text.length>120)
        {
            quoteText.classList.add('long-quote');
        }
        else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText=data[number].text;
        complete();
    }
    catch(error){
        getQuote();
    }
    console.log("found");
}

// function to tweet a quote when we click on twitter button
function tweetQuote()
{
    const quote=quoteText.innerText;
    const author=quoteAuthor.innerText;
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,"_blank");
}

// function to start loader
function load()
{
    loader.hidden=false;
    quoteContainer.hidden=true;
}

// function to complete loading
function complete(){
    if(loader.hidden===false)
    {
        loader.hidden=true;
        quoteContainer.hidden=false;
    }
}

newQuote.addEventListener('click',getQuote);
twitter.addEventListener('click',tweetQuote);

//on load
getQuote();
