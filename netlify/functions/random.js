const members = require('../../members.json');

exports.handler = async (event) => {
  const currentId = event.queryStringParameters.via;

  let randomIndex;

  // If only one member, return that member
  if (members.members.length === 1) {
    randomIndex = 0;
  }
  // If current ID provided, avoid returning same member
  else if (currentId) {
    const currentIndex = members.members.findIndex(m => m.id === currentId);

    // Keep picking random until we get someone different
    do {
      randomIndex = Math.floor(Math.random() * members.members.length);
    } while (randomIndex === currentIndex && members.members.length > 1);
  }
  // No current ID, just pick random
  else {
    randomIndex = Math.floor(Math.random() * members.members.length);
  }

  const randomMember = members.members[randomIndex];

  // Redirect to random member's website
  return {
    statusCode: 302,
    headers: {
      Location: randomMember.website,
      'Cache-Control': 'no-cache'
    }
  };
};
