const members = require('../../members.json');

exports.handler = async (event) => {
  // Get the current member ID from URL parameter
  const currentId = event.queryStringParameters.via;

  // If no ID provided, redirect to first member
  if (!currentId) {
    return {
      statusCode: 302,
      headers: {
        Location: members.members[0].website,
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

  // Calculate next index (wrap around to start)
  const nextIndex = (currentIndex + 1) % members.members.length;
  const nextMember = members.members[nextIndex];

  // Redirect to next member's website
  return {
    statusCode: 302,
    headers: {
      Location: nextMember.website,
      'Cache-Control': 'no-cache'
    }
  };
};
