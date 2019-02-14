An API that returns a Promise will result in a promise chain, and it splits the function into many parts. Consider the following code:

function getProcessedData(url) {
  return downloadData(url) // returns a promise
    .catch(e => {
      return downloadFallbackData(url)  // returns a promise
    })
    .then(v => {
      return processDataInWorker(v); // returns a promise
    });
}



it can be rewritten with a single async function as follows:

async function getProcessedData(url) {
  let v;
  try {
    v = await downloadData(url); 
  } catch(e) {
    v = await downloadFallbackData(url);
  }
  return processDataInWorker(v);
}



To use the await keyword, you MUST have written the async keyword in the function whose block contains the code. For example:
const EditMessage = async (id, content) => {
    const Message = await channel.fetchMessage(id); // Async
    return Message.edit(content);
}
async function EditMessage(id, content) {
    const Message = await channel.fetchMessage(id); // Async
    return Message.edit(content);
}

However, if you have a function inside another, for example:
const EditMessage = async (id, content) => {
    const Message = await channel.fetchMessage(id);
    setTimeout(() => {
        await Message.edit(content);
        Message.channel.send("Edited!");
    }, 5000);
}
That will throw an error:
        await Message.edit(content);
              ^^^^^^^
SyntaxError: Unexpected identifier
