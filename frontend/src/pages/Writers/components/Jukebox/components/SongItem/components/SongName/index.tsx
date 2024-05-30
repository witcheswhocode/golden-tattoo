import { useState, useRef, useEffect, useLayoutEffect } from 'react';

export default function SongName(props: any) {
  const [isExpanded, setIsExpanded] = useState(false);
  const innerDivRef = useRef<HTMLDivElement | null>(null); // Define the type of the ref
  const screenWidth = window.innerWidth;

  /*useEffect(() => {
    if (containerRef.current) {
        const innerDivWidth = containerRef.current.offsetWidth; // Get width of the inner div in pixels
        const containerDiv = containerRef.current.parentElement;
  
        if (containerDiv) {
          if (isExpanded) {
            // Get the width of the specific div by ID
            const specificDiv = document.getElementById('writers-section');
            const specificDivWidth = specificDiv?.offsetWidth; // Use offsetWidth to get width in pixels
    
            console.log(specificDivWidth && (innerDivWidth / specificDivWidth))
            console.log(innerDivWidth)
            containerDiv.style.width = specificDivWidth && (innerDivWidth / specificDivWidth) < 0.25 ? '33%' : `${innerDivWidth}px`;
          } else {
            containerDiv.style.width = '33%'
          }
        }
      }
  
  }, [isExpanded, screenWidth, props.song]);*/

  useLayoutEffect(() => {
    if (innerDivRef.current) {
      const innerDivWidth = innerDivRef.current.offsetWidth; // Get width of the inner div in pixels
      const containerDiv = innerDivRef.current.parentElement;

      //console.log(`innerDivWidth: ${innerDivWidth}px`);
      //console.log(`screenWidth: ${window.innerWidth}px`);

      if (containerDiv) {
        const screenWidth = window.innerWidth;
        if (isExpanded) {
          const newWidth = (innerDivWidth / screenWidth) < 0.23 ? '33%' : `${innerDivWidth*1.5}px`;
          containerDiv.style.width = `${newWidth}`; // Add !important to the style
          //console.log(`Setting container width to ${newWidth}`);
        } else {
          containerDiv.style.width = '33%';
          //console.log('Setting container width to else 33');
        }
      }
    }
  }, [isExpanded, props.song]);

  return (
    <div
      className="flex items-center justify-start h-10 overflow-hidden whitespace-nowrap cursor-pointer transition-width duration-300 ease-in-out"
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      onFocus={() => setIsExpanded(true)}
      onBlur={() => setIsExpanded(false)}
    >
      <div 
      ref={innerDivRef} className="w-auto text-center">{props.song}</div>
    </div>
  );
}
