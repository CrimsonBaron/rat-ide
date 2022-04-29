import React, {useMemo} from 'react';
import SvgIcon, { SvgIconProps } from '@mui/material/SvgIcon';
import { alpha, styled } from '@mui/material/styles';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import Collapse from '@mui/material/Collapse';
import { TransitionProps } from '@mui/material/transitions';


/**
 * this class takes care of the recursivly rendering the folder tree
 */


function MinusSquare(props: SvgIconProps) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14, color:'#736a60' }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 11.023h-11.826q-.375 0-.669.281t-.294.682v0q0 .401.294 .682t.669.281h11.826q.375 0 .669-.281t.294-.682v0q0-.401-.294-.682t-.669-.281z" />
    </SvgIcon>
  );
}

function PlusSquare(props: SvgIconProps) {
  return (
    <SvgIcon fontSize="inherit" style={{ width: 14, height: 14, color:'#736a60' }} {...props}>
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0zM17.873 12.977h-4.923v4.896q0 .401-.281.682t-.682.281v0q-.375 0-.669-.281t-.294-.682v-4.896h-4.923q-.401 0-.682-.294t-.281-.669v0q0-.401.281-.682t.682-.281h4.923v-4.896q0-.401.294-.682t.669-.281v0q.401 0 .682.281t.281.682v4.896h4.923q.401 0 .682.281t.281.682v0q0 .375-.281.669t-.682.294z" />
    </SvgIcon>
  );
}

function CloseSquare(props: SvgIconProps) {
  return (
    <SvgIcon
      className="close"
      fontSize="inherit"
      style={{ width: 14, height: 14, color:'#736a60' }}
      {...props}
    >
      {/* tslint:disable-next-line: max-line-length */}
      <path d="M17.485 17.512q-.281.281-.682.281t-.696-.268l-4.12-4.147-4.12 4.147q-.294.268-.696.268t-.682-.281-.281-.682.294-.669l4.12-4.147-4.12-4.147q-.294-.268-.294-.669t.281-.682.682-.281.696 .268l4.12 4.147 4.12-4.147q.294-.268.696-.268t.682.281 .281.669-.294.682l-4.12 4.147 4.12 4.147q.294.268 .294.669t-.281.682zM22.047 22.074v0 0-20.147 0h-20.12v0 20.147 0h20.12zM22.047 24h-20.12q-.803 0-1.365-.562t-.562-1.365v-20.147q0-.776.562-1.351t1.365-.575h20.147q.776 0 1.351.575t.575 1.351v20.147q0 .803-.575 1.365t-1.378.562v0z" />
    </SvgIcon>
  );
}

const getFileColor =(label:string)=>{
  switch(label.substring(label.lastIndexOf('.'),label.length)){
    case ".md":
    case ".html":{
      return '#768669';
    }
    case '.tsx':
    case '.ts':
    case '.java' :{
      return '#9FB8B5';
    }
    case '.js':
    case '.json':
    case '.jsx':{
      return '#97745C';
    }
    case '.scss':
    case '.css':{
      return '#9FB8B5';
    }
    default:{
      return '#784F53'
    }
    
  }
}

const StyledTreeItem = styled((props: TreeItemProps) => (
  <TreeItem {...props} TransitionComponent={undefined} sx={{color:`${getFileColor(props.label? props.label?.toString(): "")}`, overflow:"hidden"}} />
))(({ theme }) => ({
  [`& .${treeItemClasses.iconContainer}`]: {
    '& .close': {
      opacity: 0.3,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 15,
    paddingLeft: 18,
    borderLeft: `1px dashed ${alpha('#7C5E67', 0.7)}`,
  },
}));

interface treeProps{
    files:any
}


const Tree = (props:treeProps) => {

    const  {files} = props;
    let fileMap = new Map<string, string>();

    interface RenderTree {
      name: string;
      children?: readonly RenderTree[];
    }

    const getFileMap = (files:any) =>{
      fileMap.set(files.name, files.path);
      if(Array.isArray(files.children)){
        files.children.map((file:any) => getFileMap(file))
      }
      return;
    }

    

   

    React.useEffect(()=>{
      if(fileMap.size <= 0){
        getFileMap(files);
      }
    })

    const renderTree = (nodes: RenderTree) => (
      <StyledTreeItem key={nodes.name} nodeId={nodes.name? nodes.name: ""} label={nodes.name}>
        {Array.isArray(nodes.children) 
          ? nodes.children.map((node) => renderTree(node))
          : null}
      </StyledTreeItem>
    );
    const renderedTree = useMemo(()=>(renderTree(files)),[files])
    
    const onSelect = (event:any,nodeId:any)=>{
      const endpart = nodeId.substring(nodeId.lastIndexOf('.')+1,nodeId.length)
      let end:string = '';

      switch (endpart) {
        case 'java':
        case 'html':
        case 'css':
        case 'json':
          end = endpart;
          break;
        case 'scss':
          end = 'sass';
          break;
        case 'js':
        case 'jsx':
          end = 'javascript';
          break;
        case 'ts':
        case 'tsx':
          end = 'typescript';
          break;
        
        default:
          end = 'javascript';
          break;
      }

      console.log(fileMap.get(nodeId))

      const path:string = fileMap.get(nodeId)!;

      window.electron.ipcRenderer. displayFile(end);
      window.electron.ipcRenderer.loadFile(path);

    }

    return (
        <TreeView
          aria-label="customized"
          defaultExpanded={['1']}
          defaultCollapseIcon={<MinusSquare />}
          defaultExpandIcon={<PlusSquare />}
          defaultEndIcon={<CloseSquare />}
          onNodeSelect={onSelect}
          sx={{ height: 1, flexGrow: 1, maxWidth: 1, width:1, overflowY: 'auto', textOverflow:"ellipsis" }}
          className={"tree"}

        >
           {renderedTree} 
            
        </TreeView>
      );
}

export default Tree