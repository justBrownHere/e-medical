import React from "react";

import CountUp from "react-countup";



export default function HighlightCard({ title, count, type,img }) {

  return (
    // <Card className={classes.wrapper}>
    //   <CardContent>
    //     <Typography variant="body2" component="p" className={classes.title}>
    //       {title}
    //     </Typography>
    //     <Typography variant="body2" component="span" className={classes.count}>
    //       <CountUp end={count} separator=" " duration={2} />
    //     </Typography>
    //   </CardContent>
    //   </Card>
    <div className="col-xl-3 col-md-6 col-12">
      <div className="corona-item">
        <div className="corona-inner">
          <div className="corona-thumb">
            <img src={img} alt="corona" />
          </div>
          <div className="corona-content">
            <h3 className="count-number">
              
              <CountUp end={count} separator=" " duration={2} />
            </h3>
            <p>{title}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
