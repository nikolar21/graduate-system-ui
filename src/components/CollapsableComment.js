import {useState, forwardRef, useImperativeHandle, useEffect} from 'react';
import Typography from "@mui/material/Typography";
import {Collapse, Divider, Grid, IconButton, Paper} from "@mui/material";

const CollapsableComment = forwardRef((props, ref) => {
  useImperativeHandle(ref, () => ({
    handleCommentExpanse(expanded) {
      setExpanded(expanded);
    }
  }));
  const [expanded, setExpanded] = useState(true);

  useEffect(() => {
    console.log(props.tmpComment);
  }, props.tmpComment);

  return (
    <>
    {
      expanded ?
        <Paper key={props.tmpComment.id} style={{padding: "10px 5px"}}>
          <Grid container wrap="nowrap" spacing={2}>
            <Grid item>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                color="inherit"
              >
              </IconButton>
            </Grid>
            <Grid justifyContent="left" item xs zeroMinWidth>
              <Typography variant="body2" color="text.secondary">
                {props.tmpComment.user.username}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {props.tmpComment.comment}
              </Typography>
            </Grid>
          </Grid>
          <Divider style={{marginTop: "15px"}}></Divider>
        </Paper> : <></>
    }
    </>
  )
})

export default CollapsableComment;
