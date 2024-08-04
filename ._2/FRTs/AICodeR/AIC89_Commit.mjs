   import { spawn } from 'child_process';
   import   FRT     from './AIC90_FileFns_u03.mjs'

// var aMsg = await getLastCommitMessage( )
// var aNo = await getNextCommitNo( ); console.log(aNo)
// console.log( `  getNextCommitNo( ): ${ await getNextCommitNo( ) }` ); process.exit()
// --------------------------------------------------------------------------------------------------

async function getNextCommitNo( ) {
    var  aMsg = await getLastCommitMessage( )
    var  aNo  = aMsg.slice(1,9)
    var  aTS  = FRT._TS
     if (aNo.slice(0,5) != aTS.slice(0,5)) { 
         aNo  = `${aTS.slice(0,5)}.01`
     } else {
         aNo =  `${aNo.slice(0,5)}.${ `${ ( aNo.slice(-2) * 1 )+ 1}`.padStart(2,'0') }`               // .(40718.01.1 RAM Multiply by 1 before adding 1)     
         }
 return 'c' + aNo
         } // eof getNextCommitNo
// --------------------------------------------------------------------------------------------------

async function getLastCommitMessage( ) {
       var  aMessage = ''
  try {
    // Get the last commit message
     const  logProcess = spawn('git', ['log', '-1', '--pretty=%B']); // Get message only

       let  commitMessage = '';
            logProcess.stdout.on('data', (data) => {
            commitMessage += data.toString();
            });

            logProcess.stderr.on('data', (data) => {
            console.error( '* Error getting last commit message:', data.toString());
            });

      await new Promise((resolve) => logProcess.on('close', resolve));

        if (commitMessage) {
            aMessage = commitMessage.trim();
            console.log(   `  Last cmessage: "${aMessage}"` );
        } else {
            console.error( '* No commits found in the repository.');
            }
        } catch (error) {
            console.error( '* Error:', error);
            }    
    return  aMessage
} // eof  
// --------------------------------------------------------------------------------------------------

async function doCommitAll( aMsg ) {
  try {
       var  aMsg1 = '', aMsg2 = '' 
            console.log( '  git add .' )
     const  addProcess = spawn('git', ['add', '.']);  // Stage all changed files (assuming you want to commit all)

            addProcess.stdout.on(    'data', (data) => { aMsg1 = data.toString( ) } ) // console.log( aMsg1 ) } )   // Optional: Print output from `git add`
            addProcess.stderr.on(    'data', (data) => {                                 console.error( 'Error staging files:',  data.toString()); } );

            await new Promise((  resolve ) => addProcess.on(   'close', resolve ));

//  ---------------------------------------------------------------------------------------

            console.log( '  git commit -m aMsg' )
//   const  commitProcess = spawn('git', ['commit', '-m', '"Commit message (replace with your desired message)"']); //#.(40718.04.6)
     const  commitProcess = spawn('git', ['commit', '-m', `${aMsg}` ]);               // Commit staged changes      // .(40718.04.6 RAM Use aMsg )

            commitProcess.stdout.on( 'data', (data) => { aMsg2 = data.toString( ) } ) // console.log( aMsg2 ) } )   // Optional: Print output from `git commit`
            commitProcess.stderr.on( 'data', (data) => {                                 console.error( 'Error committing changes:', data.toString()); });

            await new Promise((  resolve ) => commitProcess.on( 'close', resolve ));

//  ---------------------------------------------------------------------------------------
        if (aMsg2.match(/nothing to commit/)) { 
            console.log( `  Nothing to commit, working tree clean` )
        } else {
            console.log( `  Commit successful.\n  ${aMsg2.split("\n").join( "\n  " ) }` );
            }
        } catch (error) {
            console.error( '* Error:', error);
            }
//  ---------------------------------------------------------------------------------------
    }
// --------------------------------------------------------------------------------------------------

export { getNextCommitNo, getLastCommitMessage, doCommitAll };

