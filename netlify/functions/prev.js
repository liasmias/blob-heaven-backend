const members = require('../../members.json');

exports.handler = async (event) => {
  const currentId = event.queryStringParameters.via;

  // If no ID provided, redirect to last member
  if (!currentId) {
    return {
      statusCode: 302,
      headers: {
        Location: members.members[members.members.length - 1].website,
        'Cache-Control': 'no-cache'
      }
    };
  }

  // Find current member's index
  const currentIndex = members.members.findIndex(m => m.id === currentId);

  // If member not found, redirect to webring hub
  if (currentIndex === -1) {
    return {
      statusCode: 302,
      headers: {
        Location: 'https://liashess.ch',
        'Cache-Control': 'no-cache'
      }
    };
  }

  // Calculate previous index (wrap around to end)
  const prevIndex = currentIndex <= 0 ? members.members.length - 1 : currentIndex - 1;
  const prevMember = members.members[prevIndex];

  // Redirect to previous member's website
  return {
    statusCode: 302,
    headers: {
      Location: prevMember.website,
      'Cache-Control': 'no-cache'
    }
  };
};
