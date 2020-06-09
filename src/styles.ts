type styleObj = { [key: string]: React.CSSProperties | styleObj }

const Styles: styleObj = {
  dropzone: {
    border: '1px dashed #ddd',
    borderRadius: '4px',
    padding: '15px',
    cursor: 'pointer',
    transition: 'height 0.2s ease',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  pictureWrapper: {
    position: 'relative',
    color: 'white',
    cursor: 'pointer',
  },
  pictureInput: {
    maxWidth: '100%',
    position: 'absolute',
    opacity: 0,
  },
  pictureImg: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
  },
  pictureBackground: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    backgroundColor: 'lightGray',
    position: 'relative',
  },
  pictureIcon: {
    position: 'absolute',
    bottom: 10,
    left: '45%',
  },
}

export default Styles
