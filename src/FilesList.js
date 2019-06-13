import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'

const humanizeBytes = size => {
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024))
  return `${(size / Math.pow(1024, i)).toFixed(2) * 1} ${
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  }`
}

const clipName = text =>
  text.length < 35
    ? text
    : `${text.slice(0, 22)}...${text.slice(text.length - 10)}`

// TODO: preview for non images (icon)
export default ({ files }) => {
  console.log('files', files)
  return files.length ? (
    <div>
      <List>
        {files.map((file, index) => (
          <ListItem alignItems="flex-start">
            <ListItemAvatar>
              <Avatar
                style={{ borderRadius: 0 }}
                alt="Preview"
                src={file.parsed}
              />
            </ListItemAvatar>
            <ListItemText
              primary={clipName(file.name)}
              secondary={humanizeBytes(file.size)}
            />
          </ListItem>
        ))}
      </List>
    </div>
  ) : null
}
