
var writerTwoWords = [0,31,64,100,125,163,185,205,233,260,281,299,322,337,351,368,380,389,404,416,433,447,471,499,526,537,544,561,588,616,654];
var time;
var i;
var t;
var finCounts= [[5,10,15,20,25,30]];
var newCount = [];

function countWords(words) {
  return words.trim().split(/\s+/).length;
}


function updateDisplay()
{
  var textWords = document.getElementById('text-writer').value;
  var wordCount = countWords(textWords);

  if(time > -1)
  {
  document.getElementById('one-count').textContent = "Your words: " + wordCount;
  document.getElementById('two-count').textContent = "Their words: " + writerTwoWords[i];
  document.getElementById('timer').textContent = time + " min left";

  if(time % 5 === 0 && time != 30)
  {
    newCount.push(wordCount);
  }
  time--;
  i++;
  }
  else
  {
    finCounts.push(newCount);
    newCount = [];
    addStop();
    declareWinner(wordCount, writerTwoWords[i-1])

  }
}

function declareWinner(yourCount, theirCount)
{
  if(yourCount > theirCount)
  {
    alert("You won! You got: " + yourCount + " words! They got: " + theirCount + " words.")
  } else if (theirCount > yourCount)
  {
    alert("You lost. :( You only got: " + yourCount + " words. They got: " + theirCount + " words.")
  } else{
    alert("It was a tie! You both got: " + yourCount  + " words.")
  }

}

function addSplits()
{
  var splits = document.getElementById('splits');

  var child = splits.firstElementChild;
  while (child){
    splits.removeChild(child);
    child = splits.firstElementChild;
  }

  var table = document.createElement('table');
  table.className = 'split-table';
  var tblBody = document.createElement('tbody');

  for (var k=0; k<finCounts.length; k++)
  {
    var row = document.createElement("tr");

  for (var j=0; j<finCounts[k].length; j++)
  {
    var cell = document.createElement("td");
    var count = document.createTextNode(finCounts[k][j]);
    cell.appendChild(count);
    row.appendChild(cell);
  }
  tblBody.appendChild(row);
  }
  table.appendChild(tblBody);
  splits.appendChild(table);
}


function addStart()
{
  addClear();
  time = 30;
  i = 0;
  //set to every second for testing, would be set to minutes in real use
  t = setInterval(updateDisplay, 1000);
}

function addStop()
{
  clearInterval(t);
  newCount = [];
}

function addClear()
{
  document.getElementById('text-writer').value = "";
}

function addTestData()
{
  finCounts = [[5,10,15,20,25,30],
  [163,299,386,478,568,621],
  [98,145,278,345,654,745]
  ];
}

function init() {
 document.getElementById('start-button').onclick = addStart;
 document.getElementById('end-button').onclick = addStop;
 document.getElementById('clear-button').onclick = addClear;
 document.getElementById('split-button').onclick = addSplits;
 document.getElementById('test-button').onclick = addTestData;

}

init();
