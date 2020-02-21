import * as React from "react";
import { RouteComponentProps, Link } from "react-router-dom";
import { memberAPI } from "../../api/memberAPI";
import { MemberEntity, createDefaultMemberEntity } from "../../model";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import { CardContent, Collapse, Typography } from "@material-ui/core";

export const MembersViewComponent: React.FC<RouteComponentProps> = (
  props: RouteComponentProps
) => {
  const {
    match: { params }
  } = props;
  const [memberState, setMemberState] = React.useState<MemberEntity>(
    createDefaultMemberEntity()
  );

  React.useEffect(() => {
    memberAPI
      .getMemberByName(params["username"])
      .then(member => setMemberState(member));
  }, []);

  return (
    <div className="row">
      <Link to={`/`}>Volver al lista de miembros</Link>

      <Card>
        <CardHeader
          avatar={<Avatar src={memberState.avatar_url}></Avatar>}
          title={memberState.login}
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
