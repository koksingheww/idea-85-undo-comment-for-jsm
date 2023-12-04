import React, { useEffect, useState } from 'react';
import { invoke, view, events, showFlag, router} from '@forge/bridge';
import Avatar from '@atlaskit/avatar';
import Button from '@atlaskit/button';
import { Box, Inline, Stack, xcss } from '@atlaskit/primitives';
import { useGetStatusUpdate } from './hooks/useStatus';

function App() {
  const { data, status } = useGetStatusUpdate();

  if(data !== undefined){
    showFlag({
      id: 'success-flag',
      title: 'Added a comment',
      type: 'info',
      description: `Issue ID:`,
      actions: [
        {
          text: 'Undo',
          onClick: {undoComment},
        }
      ],
      isAutoDismiss: true,
    });
  }

  function undoComment(){
    invoke('removeComment', { issueId: data.issueId, commentId: data.commentId });
    invoke('removeCommentFromForgeStorage', {issueId: data.issueId})
    router.reload();
  }

  if(status === "loading" || status === "error"){
    return (
      <div>No comments added recently...</div>
    )
  }

  const lighterFont = xcss({
    fontWeight: 100,
  });

  const inlineStyles = xcss({
    display: 'flex',
    alignItems: 'left',
  });

  return (
    <Box>
      <Inline space='space.300'>
          <Avatar appearance='circle' src={data.commentAuthorAvatarUrl} size="medium" name={data.commentAuthor} />
          <Stack>
            <Box>
              <span><b>{data.commentAuthor}</b></span>
              <Box>
                <span xcss={lighterFont}>added a comment</span>
              </Box>
            </Box>
            <Box paddingBlock='space.300'>
              <span>{JSON.stringify(data.commentBody.content[0].content[0].text)}</span>
            </Box>
            <Box xcss={inlineStyles}>
              <Button appearance='primary' onClick={undoComment}>Undo</Button>
            </Box>
          </Stack>
      </Inline>
    </Box>
  );
}

export default App;
