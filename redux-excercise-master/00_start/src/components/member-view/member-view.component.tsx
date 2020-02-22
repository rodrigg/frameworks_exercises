import * as React from "react";
import { RouteComponentProps, Link, useParams } from "react-router-dom";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { CardContent, Collapse, Typography } from "@material-ui/core";
import { MemberEntity, createDefaultMemberEntity } from "../../model/member";
import { memberAPI } from "../../api/member";


interface Props extends RouteComponentProps {
  memberByName: MemberEntity
  loadMemberByName: (name: string) => void;
}


export const MembersViewComponent: React.FC<Props> = (
  props: Props
) => {
  React.useEffect(() => {
    props.loadMemberByName(props["match"].params.username)
  }, []);
  return (
    <div className="row">
      <Link to={`/`}>Volver al lista de miembros</Link>

      <Card>
        <CardHeader
          avatar={<Avatar src={props.memberByName.avatar_url}></Avatar>}
          title={props.memberByName.login}
        />
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
          ></Typography>
        </CardContent>
        <Collapse in={true} timeout="auto" unmountOnExit>
          <CardContent />
        </Collapse>
      </Card>
    </div>
  );
};
