

declare namespace NComment {

  export enum EAction {
    COMMENT_USER = 'COMMENT_USER',
    COMMENT_MOVIE = 'COMMENT_MOVIE',
    FEEDBACK = 'FEEDBACK',
  }
  
  export interface Comment_Params {
    action: EAction
    postInfo?: string
  }

}