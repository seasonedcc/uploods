import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Avatar from '@material-ui/core/Avatar'
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction'
import ListItemIcon from '@material-ui/core/ListItemIcon'

import IconButton from '@material-ui/core/IconButton'
import RemoveIcon from '@material-ui/icons/RemoveCircle'
import PDFIcon from '@material-ui/icons/PictureAsPdf'
import FileIcon from '@material-ui/icons/InsertDriveFile'

const humanizeBytes = size => {
  const i = size === 0 ? 0 : Math.floor(Math.log(size) / Math.log(1024))
  return `${(size / Math.pow(1024, i)).toFixed(2) * 1} ${
    ['B', 'kB', 'MB', 'GB', 'TB'][i]
  }`
}

// Adjustable clip?
const clipName = text => {
  return text.length < 35
    ? text
    : `${text.slice(0, 22)}...${text.slice(text.length - 10)}`
}

// TODO: preview for non images (icon)
export default ({ files, setFiles }) => {
  const renderPreview = ({ type, parsed }) => {
    if (type.split('/')[0] === 'image') {
      return (
        <ListItemAvatar>
          <Avatar style={{ borderRadius: 0 }} alt="Preview" src={parsed} />
        </ListItemAvatar>
      )
    }

    if (type === 'application/pdf') {
      return (
        <ListItemIcon>
          <PDFIcon />
        </ListItemIcon>
      )
    }
    return (
      <ListItemIcon>
        <FileIcon />
      </ListItemIcon>
    )
  }
  return files.length ? (
    <div>
      <Divider />
      <List>
        {files.map((file, index) => (
          <ListItem key={index} alignItems="center">
            {renderPreview(file)}
            <ListItemText
              primary={clipName(file.name)}
              secondary={humanizeBytes(file.size)}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="Remove"
                onClick={() => {
                  setFiles(
                    files.filter(item => {
                      return item.id !== file.id
                    }),
                  )
                }}
              >
                <RemoveIcon color="secondary" />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        ))}
      </List>
    </div>
  ) : null
}
